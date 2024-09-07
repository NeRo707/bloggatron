import express from "express";
import cors from "cors";
import { database, auth, signUpUser, signInUser, admin } from "./firebase";

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const Posts = database().collection("posts");

app.get("/", (req, res) => {
  res.send("app is working");
});

app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res
      .status(400)
      .json("Please fill the required inputs before clicking register!");
  } else {
    try {
      const userCredential = await signUpUser(auth, email, password);

      const { refreshToken } = userCredential.user;
      const token = await userCredential.user.getIdToken();
      const userName = userCredential.user.email

      console.log("User signed up:", userCredential);
      res.status(200).json({
        // "User signed up successfully": userCredential,
        userName,
        accessToken: token,
        refreshToken: refreshToken,
      });
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(400).json({ "Error signing up": error });
    }
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(400).json({
      message: "Please fill the required inputs before clicking login!",
    });
  } else {
    try {
      const userCredential = await signInUser(auth, email, password);
      const { refreshToken } = userCredential.user;
      const token = await userCredential.user.getIdToken();
      console.log("User logged in:", userCredential);
      res.status(200).json({
        // "User logged in successfully": userCredential,
        userName: userCredential.user.email,
        accessToken: token,
        refreshToken: refreshToken,
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(400).json({ "Error logging in": error });
    }
  }
});

app.post("/api/verifyToken", async (req, res) => {
  const { token } = req.body;
  // console.log(token);
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userName = decodedToken.email;
    // console.log("Token verified successfully:", decodedToken);
    res.status(200).json({ "Token verified successfully": decodedToken, userName });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(400).json({ "Error verifying token": error });
  }
});

app.get("/api/posts", async (req, res) => {
  const posts = await Posts.get();
  const postsData = posts.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.status(200).json(postsData);
});

app.post("/api/post/:id/comment", async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    // Reference the specific post document
    const postRef = Posts.doc(id);

    // Add a comment to the 'comments' array in the post document
    await postRef.update({
      comments: admin.firestore.FieldValue.arrayUnion({
        comment,
        createdAt: new Date(),
      }),
    });

    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment: ", error);
    res.status(500).send("Error adding comment");
  }
});

app.post("/api/post", async (req, res) => {
  const { title, content, publish } = req.body;
  const authToken = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header
  // console.log("Auth token:",authToken);
  if (!authToken) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Verify the token with Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(authToken);
    const userId = decodedToken.uid; // Get userId from the token
    const userName = decodedToken.email; // Get userName from the token
    // Proceed with creating the post if authenticated
    const docRef = await Posts.add({
      userId,
      userName,
      title, 
      content, 
      publish, 
      comments: [], 
      published_on: publish ? admin.firestore.FieldValue.serverTimestamp() : null, 
      createdAt: new Date(),
    });

    console.log("Document written with ID: ", docRef.id);
    res.status(200).json({ message: "Document written with ID", docId: docRef.id });
  } catch (error) {
    console.error("Error adding document: ", error);

    if (error.code === "auth/id-token-expired" || error.code === "auth/argument-error") {
      return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }

    res.status(400).json({ message: "Error adding document", error });
  }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await database().collection("posts").doc(id).get();
    const post = snapshot.data();
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(400).json({ "Error fetching post": error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

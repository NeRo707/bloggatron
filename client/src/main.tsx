import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import { BrowserRouter } from "react-router-dom";
import { PostsProvider } from "./context/postsContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <PostsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PostsProvider>
    </AuthProvider>
  </StrictMode>
);

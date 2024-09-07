// src/pages/Posts.tsx
import { Link } from "react-router-dom";
import { usePosts } from "../hooks/usePosts"; // Import the usePosts hook

const Posts = () => {
  const { posts, loading } = usePosts(); // Get posts and loading state from context
  console.log(posts);
  return (
    <div className="min-h-screen bg-[#FFEDD8] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-[#240A34] mb-6 text-center">
          Posts
        </h1>
        <p className="text-lg text-[#240A34]">
          Welcome to your protected posts page! 🎉
        </p>

        {loading ? ( // Show loading state
          <p>Loading posts...</p>
        ) : (
          <ul className="mt-6 space-y-4">
          {posts.map((post) => (
            <Link to={`/posts/${post.id}`} key={post.id} className="block"> 
              <li className="bg-[#EABE6C] text-black p-4 rounded-lg shadow hover:bg-[#d9a954]">
                <h2 className="font-bold">{post.title}</h2>
                <p>{post.content}</p> 
              </li>
            </Link>
          ))}
        </ul>
        )}
      </div>
    </div>
  );
};

export default Posts;

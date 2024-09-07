// src/context/usePosts.ts
import { useContext } from "react";
import { PostsContext } from "../context/postsContext"; // Import the context

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
};

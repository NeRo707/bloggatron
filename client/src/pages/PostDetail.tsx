// src/pages/PostDetail.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Comment {
  comment: string;
  createdAt: string;
}

interface Post {
  title: string;
  userName: string;
  content: string;
  publish: boolean;
  published_on: string;
  comments: Comment[];
}

const PostDetail = () => {
  const { id } = useParams(); // Get the post ID from the URL params
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/${id}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Loading post...</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="min-h-screen bg-[#FFEDD8] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-[#240A34] mb-6 text-center">
          {post.title}
        </h1>
        <p className="text-xs text-gray-700 mb-2">{post.userName}</p>
        <p className="text-lg text-[#240A34] mb-4">{post.content}</p>

        {post.publish ? (
          <p className="text-sm text-gray-500 mb-4">
            Published on: {new Date(post.published_on).toLocaleDateString()}
          </p>
        ) : (
          <p className="text-sm text-red-500 mb-4">
            This post is not published
          </p>
        )}

        <h2 className="text-2xl font-semibold text-[#240A34] mb-4">Comments</h2>
        {post.comments.length > 0 ? (
          <ul className="space-y-4">
            {post.comments.map((comment, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                <p className="text-[#240A34] mb-2">{comment.comment}</p>
                <p className="text-sm text-gray-500">
                  Commented on:{" "}
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostDetail;

// Login.tsx
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#240A34] via-[#891652] to-[#EABE6C]">
      <div className="bg-[#FFEDD8] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#240A34]">
          Log In
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-[#240A34] font-semibold mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EABE6C] transition duration-300 ease-in-out"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#240A34] font-semibold mb-2">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EABE6C] transition duration-300 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#891652] text-white font-semibold py-3 rounded-lg hover:bg-[#240A34] focus:outline-none focus:ring-4 focus:ring-[#EABE6C] transition duration-300 ease-in-out"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

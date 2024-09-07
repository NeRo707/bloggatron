import { Dispatch, SetStateAction } from "react";
import axios from "axios";

type User = {
  userName: string;
} | null;

type useAuthType = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
export const useAuthProvider = ({
  user,
  setUser,
  isAuthenticated,
  setIsAuthenticated,
  isLoading,
  setIsLoading,
}: useAuthType) => {
  const checkTokenValidity = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsLoading(false);
      setIsAuthenticated(false);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/verifyToken",
        { token }
      );
      if (response.status === 200) {
        const { userName } = response.data;
        console.log("Token verified successfully:", response.data);
        setUser({ userName });
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      const { accessToken, refreshToken, userName } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setUser({ userName });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expirationTime");
    setIsAuthenticated(false);
  };

  const signup = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        email,
        password,
      });
      const { accessToken, refreshToken, userName } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setUser({ userName });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    signup,
    checkTokenValidity,
  };
};

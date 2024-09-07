import React, { createContext, useEffect, useRef, useState } from "react";
import { useAuthProvider } from "../hooks/useAuthProvider";

type User = {
  userName: string;
} | null;

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  signup: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const auth = useAuthProvider({
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
  });

  const authRef = useRef(auth);

  useEffect(() => {
    authRef.current.checkTokenValidity();
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export { AuthContext }; // Export AuthContext for use in useAuthContext.ts

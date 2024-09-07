// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();

  const linkStyle =
    "hover:bg-[#EABE6C] hover:text-black text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out";

  return (
    <nav className="bg-[#891652] text-white flex justify-between items-center p-4 shadow-lg">
      <h1 className="text-2xl font-bold ml-4 animate-pulse">BLOG</h1>
      <ul className="flex items-center space-x-4 mr-4">
        <Link className={linkStyle} to="/">
          Home
        </Link>
        {isAuthenticated ? (
          <>
            <li>
              <Link className={linkStyle} to="/posts">
                Posts
              </Link>
            </li>
            <li>
              <button className={linkStyle} onClick={logout}>
                Logout
              </button>
            </li>
            <li>
              <Link className={linkStyle} to="/profile">
                Profile
              </Link>
            </li>
          </>
        ) : (
          <>
            <Link className={linkStyle} to="/signup">
              Sign Up
            </Link>
            <Link className={linkStyle} to="/login">
              Log In
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

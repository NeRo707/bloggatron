// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Posts from './pages/Posts';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar'; // Import the Navbar component
import Home from './pages/Home';
import Login from './pages/Login';
import { useAuth } from './hooks/useAuth';
import PostDetail from './pages/PostDetail';
import Profile from './pages/Profile';

function App() {
  const { isAuthenticated, user } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/posts" replace /> : <SignUp />} />
        <Route path='/login' element={isAuthenticated ? <Navigate to="/posts" replace /> : <Login />} />
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <ProtectedRoute>
              <PostDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile user={user}/>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<p>404 Error - Nothing here...</p>} />
      </Routes>
    </>
  );
}

export default App;

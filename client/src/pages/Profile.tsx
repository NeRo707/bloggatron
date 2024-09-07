import React from 'react';

interface ProfileProps {
  user: {
    userName: string;
  } | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {

  const name = user?.userName.split('@')[0];
  const email = user?.userName;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Profile</h1>
        <p className="text-lg text-gray-700">Name: {name}</p>
        <p className="text-lg text-gray-700">Email: {email}</p>
      </div>
    </div>
  );
}

export default Profile;

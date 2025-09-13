import React from 'react';
import { assets } from '../assets/QuickBlog-Assets/assets';
import { useNavigate } from 'react-router-dom';

const ViewProfile = ({ profileData }) => {
  const navigate = useNavigate();

  if (!profileData) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading profile...
      </div>
    );
  }

  const imageUrl = `http://localhost:5002/uploads/${profileData.profileImage}`;

  return (
    <div className="min-h-screen bg-primary/10 flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6 text-center space-y-4">
        <img
          src={profileData.profileImage ? imageUrl : assets.user_icon}
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-primary"
        />
        <h2 className="text-2xl font-bold text-primary">{profileData.userName}</h2>
        <p className="text-gray-600 italic">{profileData.profileDesciption}</p>
        <div className="bg-primary/5 p-3 rounded-md">
          <p className="text-sm text-primary font-medium">Address</p>
          <p className="text-gray-700">{profileData.address}</p>
        </div>
        <button
          onClick={() => navigate('/profile')}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 hover:scale-105 transition-transform"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ViewProfile;

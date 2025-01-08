import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { LuMessageSquareMore } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useLoginSignUp } from "../BlogApi/LoginContext";

const Header = () => {
  const navigate = useNavigate();
  const { UserLogout, user ,isAuthorized} = useLoginSignUp();  
  // const isAuthenticated = localStorage.getItem("authToken"); 
  
  const [profileImage, setProfileImage] = useState(() => {
    const savedImage = localStorage.getItem("profileImage");
    return savedImage || null;
  });

  const handleEditClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = reader.result;
        setProfileImage(newImage);
        localStorage.setItem("profileImage", newImage);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleLogout = () => {
    UserLogout();  
    navigate("/login");  
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-300 shadow fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-700 transition duration-300"
          >
            Chatterly
          </Link>
        </h1>
        <span
          className="text-blue-600 text-3xl font-bold relative"
          style={{ top: "-0.5em" }}
        >
          <LuMessageSquareMore />
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-medium">{user?.name || "Guest"}</span>

        <div className="relative">
          <img
            src={profileImage || "https://via.placeholder.com/40"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <FaEdit
            className="absolute bottom-0 right-0 text-blue-500 cursor-pointer bg-white p-1 rounded-full shadow-md"
            onClick={handleEditClick}
            size={18}
          />
        </div>

        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {isAuthorized ? (
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 transition duration-300 flex items-center gap-1"
          >
            <FiLogOut size={24} />
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 transition duration-300 flex items-center gap-1"
          >
            <FiLogIn size={24} />
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

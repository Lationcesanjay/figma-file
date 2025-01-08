import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import BlogForm from "./components/BlogFrom/BlogFrom";
import BlogHome from "./components/blog/BlogHome";
import { BlogProvider } from "./components/BlogApi/blogApi";
import LoginSignupForm from "./components/BlogFrom/LoginSignUp";
import  { useLoginSignUp } from "./components/BlogApi/LoginContext";

const App = () => {
  // const isAuthenticated = localStorage.getItem("authToken"); 
  const {isAuthorized}=useLoginSignUp();
  
 
  return (
    <>
    <BlogProvider>
      <BrowserRouter>
        <Routes>
          {isAuthorized ? (
            <>
              <Route path="/" element={<BlogHome />} />
              <Route path="/blogs" element={<BlogForm />} />
              <Route path="/blogs/:id" element={<BlogForm />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
          <Route path="/login" element={<LoginSignupForm />} />
          <Route path="/signup" element={<LoginSignupForm />} />
        </Routes>
      </BrowserRouter>
    </BlogProvider>
  </>
  
  );
};

export default App;

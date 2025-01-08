import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [blogToEdit, setBlogToEdit] =useState('');

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8000/api/blogs");
      setBlogs(response.data);
     } catch (err) {
      setError("Failed to fetch blogs");
      console.error("Fetch Blogs Error:", err.message);
    } finally {
      setLoading(false);
    }
  };
  const addBlogs = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/blogs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      setBlogs((prevBlogs) => [...prevBlogs, response.data]);
    } catch (err) {
       console.error("Error adding blog:", err?.response?.data || err.message);
      setError(err?.response?.data?.message || "Failed to add blog");
    }
  };
  

  const getBlogById = async (id) => {
    try {
      const response = await axios.get(
        `${"http://localhost:8000/api/blogs"}/${id}`
      );
      return response.data;
    } catch (err) {
      setError("Failed to fetch blog by ID");
      console.error("Fetch Blog By ID Error:", err.message);
    }
  };
  const deleteBlogById = async (id) => { 
    try {
       await axios.delete(`http://localhost:8000/api/blogs/${id}`);
        setBlogs(blogs.filter((blog) => blog._id !== id));  
     } catch (err) {
       setError(`Failed to delete blog with ID: ${id}`);
        console.error("Error deleting blog:", err.response ? err.response.data : err);
    }
  };
  

  const updateBlogById = async (updatedBlog) => {
    try {
      if (!updatedBlog._id) {
        throw new Error("Blog ID is missing.", updatedBlog._id);
      }
      const response = await axios.put(
        `http://localhost:8000/api/blogs/${updatedBlog._id}`,
        updatedBlog,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );      

      setBlogs((prevBlogs) =>
        prevBlogs.map((Blog) =>
          Blog._id === updatedBlog._id ? { ...Blog, ...updatedBlog  } : Blog
    )
  );
     } catch (error) {
      console.error("Error updating Blog:", error);
      setError("Failed to update Blog.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        blogs,
        loading,
        error,
        blogToEdit,
        setBlogToEdit,
        fetchBlogs,
        addBlogs,
        getBlogById,
        deleteBlogById,
        updateBlogById,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return context;
};

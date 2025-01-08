import React, { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { useBlogContext } from "../BlogApi/blogApi";
import logo from "/assets/placeholder.jpg";
import { useLoginSignUp } from "../BlogApi/LoginContext";

export const BlogCard = () => {
  const {
    blogs,
    loading,
    fetchBlogs,
    updateBlogById,
    deleteBlogById,
    setBlogToEdit,
  } = useBlogContext();
  const {user}=useLoginSignUp();

  const [blogState, setBlogState] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (Array.isArray(blogs)) {
      setBlogState(
        blogs.map((blog) => ({
          ...blog,
          comments: blog.comments || [],
          likes: blog.likes || 0,
        }))
      );
    }
  }, [blogs]);

  const navigate = useNavigate(); 
  const handleEdit = (blog) => {
     setBlogToEdit(blog);  
    navigate(`/blogs/${blog._id}`);  

  };

  const handleDeleteBlog = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlogById(id)
        .then(() => {
          setBlogState((prevState) =>
            prevState.filter((blog) => blog._id !== id)
          );
        })
        .catch((error) => console.error("Error deleting blog:", error));
    }
  };

  const handleLike = (id) => {
    setBlogState((prevState) =>
      prevState.map((blog) =>
        blog._id === id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    );
    updateBlogById(id, { likes: blogState.find((b) => b._id === id)?.likes + 1 });
  };

  const handleAddComment = (id, comment) => {
    if (comment.trim() === "") return;
    setBlogState((prevState) =>
      prevState.map((blog) =>
        blog._id === id
          ? { ...blog, comments: [...blog.comments, comment] }
          : blog
      )
    );
  };

  const handleDeleteComment = (blogId, commentIndex) => {
    setBlogState((prevState) =>
      prevState.map((blog) =>
        blog._id === blogId
          ? {
              ...blog,
              comments: blog.comments.filter(
                (_, index) => index !== commentIndex
              ),
            }
          : blog
      )
    );
  };

  const isBlogsArray = Array.isArray(blogState);

  return (
          <div className=" p-10 mt-20 min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-black">Blogs:</h1>
        <Link
          to="/blogs"
          className="text-3xl font-bold text-gray-800 hover:text-blue-700 transition duration-300"
        >
          Add Blogs
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-gradient-to-r from-blue-400 to-purple-500">
        {loading ? (
          <p className="text-center text-gray-600">Loading blogs...</p>
        ) : isBlogsArray ? (
          blogState.map((blog) => (
            <div
              key={blog._id || blog.id}
              className="blog-card transform transition duration-300 hover:scale-105"
            >
              <div className="max-w-sm mx-auto bg-gray-300 shadow-lg rounded-lg overflow-hidden font-sans hover:shadow-xl relative">
                <img
                  className="w-full h-48 object-cover"
                  src={blog.image || {logo}}
                  alt={blog.title || "Blog cover"}
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <MdEdit
                    onClick={() => handleEdit(blog._id)}
                    className="text-gray-700 cursor-pointer hover:text-gray-900"
                    size={24}
                  />
                  <MdDelete
                    onClick={() => handleDeleteBlog(blog._id)}
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    size={24}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {blog.title || "Untitled Blog"}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    {blog.description?.slice(0, 100) || "No description"}...
                  </p>
                </div>

                <div className="px-4 pb-4 text-gray-600 text-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img
                        src={
                          blog.authorImage ||
                          {logo}
                        }
                        alt="Author"
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {user?.name || "Anonymous"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(blog.date).toLocaleDateString() || "N/A"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleLike(blog._id)}
                      className="flex items-center gap-1 text-green-500 hover:text-green-700 transition duration-300"
                    >
                      <FaHeart />
                      <span>{blog.likes}</span>
                    </button>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">Comments:</h3>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      {blog.comments.length > 0 ? (
                        blog.comments.map((comment, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <span>&ndash; {comment}</span>
                            <button
                              onClick={() =>
                                handleDeleteComment(blog._id, index)
                              }
                              className="text-red-500 text-xs hover:text-red-700 transition duration-300"
                            >
                              Delete
                            </button>
                          </li>
                        ))
                      ) : (
                        <li>No comments yet.</li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddComment(blog._id, e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No blogs available.</p>
        )}
      </div>
    </div>
  );
};

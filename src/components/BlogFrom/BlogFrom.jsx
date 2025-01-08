import React, { useState, useEffect } from "react";
import { useBlogContext } from "../BlogApi/blogApi";
import Header from "../blog/header";
import { BlogFooter } from "../blog/footer";

function BlogForm() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});
  const { blogs, addBlogs, updateBlogById, blogToEdit, setBlogToEdit } =
    useBlogContext();
    

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  useEffect(() => {
    if (blogToEdit) {
      const blog = blogs.find((b) => b === blogToEdit);
      if (blog) {
        setAuthor(blog.author || "");
        setTitle(blog.title || "");
        setDescription(blog.description || "");
        setImage(null);
      }
    }
  }, [blogToEdit]);

  const validateForm = () => {
    const newErrors = {};
    if (!author.trim()) newErrors.author = "Author name is required.";
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!image && !blogToEdit) newErrors.image = "Image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("author", author);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("image", image);

      if (blogToEdit) {
        const updatedBlog = {
          _id: blogToEdit._id,
          author,
          title,
          description,
          image,
          date,
        };
        await updateBlogById(updatedBlog);
        setBlogToEdit(null);
        alert("Blog updated successfully");
      } else {
        await addBlogs(formData);
        alert("Blog added successfully");
      }

      setAuthor("");
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error(
        blogToEdit ? "Error updating blog:" : "Error adding blog:",
        error
      );
    }
  };

  return (
    <>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 to-purple-900">
        <Header />

         <div className="  p-10  shadow-lg rounded-lg mt-20 mb-4 bg-gradient-to-r from-blue-400 to-purple-500">
          <h1 className="text-3xl font-semibold text-center mb-6">
            {blogToEdit ? "Edit Blog" : "Create a Blog"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              {
                label: "Author",
                id: "author",
                type: "text",
                value: author,
                setter: setAuthor,
                error: errors.author,
              },
              {
                label: "Title",
                id: "title",
                type: "text",
                value: title,
                setter: setTitle,
                error: errors.title,
              },
              {
                label: "Description",
                id: "description",
                type: "textarea",
                value: description,
                setter: setDescription,
                error: errors.description,
              },
            ].map(({ label, id, type, value, setter, error }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-lg font-medium text-gray-700"
                >
                  {label}:
                </label>
                {type === "textarea" ? (
                  <textarea
                    id={id}
                    value={value}
                    onChange={(e) => {
                      setErrors((prev) => ({ ...prev, [id]: null }));
                      setter(e.target.value);
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                  />
                ) : (
                  <input
                    type={type}
                    id={id}
                    value={value}
                    onChange={(e) => {
                      setErrors((prev) => ({ ...prev, [id]: null }));
                      setter(e.target.value);
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
                {error && <span className="text-red-500 text-sm">{error}</span>}
              </div>
            ))}

            <div>
              <label
                htmlFor="image"
                className="block text-lg font-medium text-gray-700"
              >
                Upload Image:
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => {
                  setErrors((prev) => ({ ...prev, image: null }));
                  setImage(e.target.files[0]);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.image && (
                <span className="text-red-500 text-sm">{errors.image}</span>
              )}
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-lg font-medium text-gray-700"
              >
                Date:
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {blogToEdit ? "Update Blog" : "Submit"}
            </button>
          </form>
        </div>
      </div>
        <BlogFooter />
    </>
  );
}

export default BlogForm;

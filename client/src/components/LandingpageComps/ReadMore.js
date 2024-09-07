import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaThumbsUp, FaShareAlt } from "react-icons/fa";

function ReadMoreBlog() {
  const location = useLocation();
  const { post } = location.state || {}; // Get the post data from the route state
  const navigate = useNavigate();

  if (!post) {
    return <div>No content available</div>;
  }

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleLike = () => {
    // Implement the like functionality
    alert("You liked this post!");
  };

  const handleShare = () => {
    // Implement the share functionality
    alert("Share functionality to be implemented.");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-40">
      {/* Navigation and Action Buttons */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            <FaThumbsUp className="mr-2" /> Like
          </button>
          <button
            onClick={handleShare}
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            <FaShareAlt className="mr-2" /> Share
          </button>
        </div>
      </div>

      {/* Title and Metadata */}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 text-md mb-2">
        By {post.author} | {post.date} | {post.readTime}
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Main Image */}
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-96 object-cover mb-6 rounded-lg shadow-lg"
      />

      {/* Blog Content */}
      <div className="mt-6 text-gray-800 leading-relaxed">
        <p className="mb-6">{post.content1}</p>
        <p>{post.content2}</p>
      </div>

      {/* Related Posts Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
        <ul className="list-disc list-inside">
          {post.relatedPosts.map((related, index) => (
            <li
              key={index}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {related}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ReadMoreBlog;

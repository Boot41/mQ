import React from "react";
import { motion } from "framer-motion";
import { BlogPosts } from "../../InformationFiles/LandingPageInfo";
import { useNavigate } from "react-router-dom"; // For navigation

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const LatestInsights = () => {
  const navigate = useNavigate(); // Hook for navigation
  const post = BlogPosts[0]; // Assuming there's only one blog post

  const handleReadMoreClick = (post) => {
    navigate("/ReadmoreBlogs", { state: { post } }); // Navigates to the Readmore section with post data
  };

  return (
    <div className="relative px-6 mx-auto max-w-4xl -mt-20">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Latest Insight
        </h1>
        <div className="w-16 h-1 bg-orange-400 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600">
          Stay updated with the latest trends and developments in the world of AI and technology.
        </p>
      </div>

      {/* Blog Post Section */}
      <div className="flex justify-center py-4">
        <motion.div
          key={post.id} // Ensure unique key
          className="relative bg-white rounded-lg overflow-hidden w-full max-w-3xl shadow-lg border border-gray-200"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.5 }}
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-70 object-cover cursor-pointer"
            onClick={() => handleReadMoreClick(post)}
          />
          <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-80 p-4">
            <h2 className="text-2xl font-bold text-gray-900">{post.title}</h2>
            <p className="text-gray-600 mt-2 text-sm">{post.summary}</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-gray-500">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c1.319 0 2.539-.532 3.474-1.467C16.908 5.499 17.44 4.279 17.44 2.96H19.76m-7.68 9.04c-1.319 0-2.539.532-3.474 1.467C7.092 14.501 6.56 15.721 6.56 17.04H4.24M10.76 5.92C9.441 5.92 8.221 6.453 7.286 7.386C6.351 8.319 5.82 9.539 5.82 10.96h-2.32m14.6 2.08c1.319 0 2.539-.532 3.474-1.467C22.908 10.499 23.44 9.279 23.44 7.96h-2.32"
                  ></path>
                </svg>
                <span className="text-sm">{post.author}</span>
              </div>
              <span className="text-sm">{post.date}</span>
            </div>
            <button
              onClick={() => handleReadMoreClick(post)}
              className="mt-4 text-blue-500 text-sm font-semibold hover:underline"
            >
              Read More
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LatestInsights;

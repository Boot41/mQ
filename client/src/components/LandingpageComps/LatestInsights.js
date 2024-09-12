import React from "react";
import { motion } from "framer-motion";
import { BlogPosts } from "../../InformationFiles/LandingPageInfo";
import { useNavigate } from "react-router-dom";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const LatestInsights = () => {
  const navigate = useNavigate();
  const post = BlogPosts[0];

  const handleReadMoreClick = (post) => {
    navigate("/ReadmoreBlogs", { state: { post } });
  };

  return (
    <div className="relative px-6 mx-auto max-w-4xl" style={{ fontFamily: 'inherit' }}>
      {/* Heading Section */}
      <div className="text-center mb-8" style={{ fontFamily: 'inherit' }}>
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4 mt-8" style={{ fontFamily: 'inherit' }}>
          Latest Insight
        </h1>
        <div className="w-32 h-1 bg-orange-400 mx-auto mb-4"></div>
        <p className="text-base text-xl text-gray-600" style={{ fontFamily: 'inherit' }}>
          Stay updated with the latest trends and developments in the world of AI and technology.
        </p>
      </div>

      {/* Blog Post Section */}
      <motion.div
        className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ duration: 0.5 }}
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={() => handleReadMoreClick(post)}
        />
        <div className="p-6" style={{ fontFamily: 'inherit' }}>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide mb-2" style={{ fontFamily: 'inherit' }}>
            AI & Technology
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'inherit' }}>
            {post.title}
          </h2>
          <p className="text-gray-600 mb-4" style={{ fontFamily: 'inherit' }}>
            {post.summary}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500" style={{ fontFamily: 'inherit' }}>
            <div className="flex items-center">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              <span style={{ fontFamily: 'inherit' }}>{post.author}</span>
            </div>
            <span style={{ fontFamily: 'inherit' }}>{post.date}</span>
          </div>
          <button
            onClick={() => handleReadMoreClick(post)}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-300"
            style={{ fontFamily: 'inherit' }}
          >
            Read More
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LatestInsights;

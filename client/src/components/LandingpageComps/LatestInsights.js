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

  const handleReadMoreClick = (post) => {
    navigate("/ReadmoreBlogs", { state: { post } }); // Navigates to the Readmore section with post data
  };

  return (
    <div className="relative  px-6 mx-auto max-w-7xl -mt-60">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">
          Latest Insights
        </h1>
        <div className="w-24 h-1 bg-orange-400 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600">
          Stay updated with the latest trends and developments in the world of
          AI and technology.
        </p>
      </div>

      {/* Podcast Section */}
      <div
        className="relative h-[300px] bg-cover bg-center rounded-lg overflow-hidden shadow-xl mb-12"
        style={{ backgroundImage: "url(static/podcast2.jpg)" }}
      >
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-white bg-opacity-40 p-4">
          <h2 className="text-4xl font-bold text-gray-900">
            Skyrocket your audience
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Meet the most powerful team that will skyrocket your audience by
            generating the right content.
          </p>
          <div className="absolute right-4 top-[-10px] transform rotate-300">
            <svg
              className="w-6 h-6 text-gray-200"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 4.5L15.5 10L10 15.5L8.5 14L11.5 11H4V9H11.5L8.5 6L10 4.5Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="flex gap-8 overflow-x-auto py-2">
        {BlogPosts.map((post, index) => (
          <motion.div
            key={index}
            className="relative bg-white rounded-lg overflow-hidden w-[400px] h-80 shadow border border-gray-200"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => handleReadMoreClick(post)}
            />
            <div className="absolute bottom-0 left-0 w-full h-fit bg-white bg-opacity-10 p-4">
              <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
              <p className="text-gray-600 mt-2 text-sm">{post.summary}</p>
              <div className="flex items-center justify-between text-gray-500 mt-3">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4"
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
                  <span className="ml-1 text-sm">{post.author}</span>
                </div>
                <span className="text-sm">{post.date}</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex space-x-2">
                  {post.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-block bg-gray-200 bg-opacity-50 px-2 py-1 rounded-full text-xs font-semibold text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div>
                  <button
                    onClick={() => handleReadMoreClick(post)}
                    className="text-blue-500 text-sm font-semibold hover:underline"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestInsights;

import React from "react";
import { PressReleasePosts } from "../../InformationFiles/LandingPageInfo";
import { useNavigate } from "react-router-dom";

const PressSection = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleReadMoreClick = (post) => {
    navigate("/ReadmoreBlogs", { state: { post } }); // Navigates to the Readmore section with post data
  };

  return (
    <section className="px-6 py-12 bg-white mb-20" style={{ fontFamily: 'inherit' }}>
      <div className="max-w-xl mx-auto" style={{ fontFamily: 'inherit' }}>
        <div className="flex justify-center items-center mb-4" style={{ fontFamily: 'inherit' }}>
          <h1 className="text-7xl font-bold text-gray-800 mr-4" style={{ fontFamily: 'inherit' }}>
            Press Release
          </h1>
        </div>
        <div className="w-32 h-1 bg-orange-400 mx-auto mb-6"></div>

        <div className="flex space-x-4">
          {PressReleasePosts.map((post, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md overflow-hidden flex flex-col w-full max-w-50"
              style={{ fontFamily: 'inherit' }}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => handleReadMoreClick(post)}
              />
              <div className="p-6 flex-grow" style={{ fontFamily: 'inherit' }}>
                <h2 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'inherit' }}>
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mb-3" style={{ fontFamily: 'inherit' }}>
                  {post.date} • {post.author}
                </p>
                <p className="text-gray-700 mb-4" style={{ fontFamily: 'inherit' }}>
                  {post.summary}
                </p>

                <div className="flex space-x-2 mb-3">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                      style={{ fontFamily: 'inherit' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  className="text-blue-600 hover:underline mt-auto cursor-pointer"
                  onClick={() => handleReadMoreClick(post)}
                  style={{ fontFamily: 'inherit' }}
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressSection;

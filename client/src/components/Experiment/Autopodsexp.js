import React from 'react';
import '../../App.css'; // Assuming your Tailwind CSS is imported here

const AutoPodsExp = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ParallaxSection />
    </div>
  );
};

const ParallaxSection = () => {
  // Inline styles for the background image
  const backgroundStyle = {
    backgroundImage: 'url(static/services2.webp)', // Replace with your image URL
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100vh', // Adjust height as needed
  };

  return (
    <div 
      className="relative min-h-screen bg-gray-900 text-white" 
      style={backgroundStyle} // Apply background styles here
    >
      {/* Overlay content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="p-10 bg-black bg-opacity-50 rounded-lg backdrop-filter backdrop-blur-sm max-w-md w-full">
          <h2 className="text-3xl font-bold mb-4 text-center">Try Our Autopods Now</h2>
          <p className="mb-6 text-center">
            Autonomous pods is a cross-functional team consisting of full stack engineers, engineering & product managers, working alongside Gen AI agents. This approach ensures that we deliver robust, end-to-end products and services tailored to your specific needs.
          </p>
          <div className="text-center">
            <button className="bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300">
              Try Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoPodsExp;

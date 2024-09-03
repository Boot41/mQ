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
  const backgroundStyle = {
    backgroundImage: 'url(auto2.jpeg)', // Replace with your image URL
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100vh' // Adjust height as needed
  };

  return (
    <div className="relative overflow-hidden" style={{ height: '100vh' }}>
      <div className="absolute inset-0" style={backgroundStyle}>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="p-10 bg-black bg-opacity-50 rounded-lg backdrop-filter backdrop-blur-sm">
            <h2 className="text-4xl font-bold mb-4">Together We Advance</h2>
            <p className="mb-6">
              AMD is pushing the limits of innovation to tackle some of the world's toughest challenges and provide value to our partners.
            </p>
            <button className="bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoPodsExp;
    
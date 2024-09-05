import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div 
    className="flex items-center justify-center h-[450px] bg-cover bg-center" 
    style={{ backgroundImage: 'url(careers2.webp)' }}
  >
    <div 
      className="bg-black bg-opacity-50 px-8 py-10 rounded-lg max-w-3xl mx-auto text-center"
    >
      <h1 className="text-5xl font-bold mb-4 text-white">
        Be the force behind impactful <span className="text-orange-400">AI advancements</span>
      </h1>
      <p className="mb-8 text-lg text-white">
        We are a bunch of tech enthusiasts and dreamers who want to turn AI possibilities into reality. Founded by seasoned entrepreneurs, we offer a culture of inclusivity, balance, and a flat structure where your career growth is in your hands.
      </p>
      <div className="flex justify-center space-x-4">
        <Link to="/openpositions">
          <button className="px-8 py-3 bg-orange-400 text-black font-semibold rounded-md hover:bg-orange-500 transition duration-300">
            Open Positions
          </button>
        </Link>
        <Link to="/contact">
          <button className="px-8 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition duration-300">
            Contact Us
          </button>
        </Link>
      </div>
    </div>
  </div>
);
};
export default HeroSection;

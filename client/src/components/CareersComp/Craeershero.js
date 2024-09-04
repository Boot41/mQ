import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="flex items-center justify-center h-[400px] bg-cover bg-center" style={{ backgroundImage: 'url(careers2.webp)' }}>
      <div className="text-center text-white px-4 bg-black bg-opacity-50 py-8 rounded-md">
        <h1 className="text-4xl font-bold mb-3">
          We Help Businesses Grow <span className="text-orange-400">And Innovate</span>
        </h1>
        <p className="mb-6">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/openpositions">
            <button className="px-6 py-3 bg-orange-400 text-black font-semibold rounded-md">
              Open Positions
            </button>
          </Link>
          <Link to="/contact">
            <button className="px-6 py-3 bg-white text-black font-semibold rounded-md">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative h-90 bg-blue-900">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-50"></div>
      <img src="/api/placeholder/1920/1080" alt="Skyscraper" className="object-cover w-full h-full" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl font-bold mb-4">AROUND THE WORLD</h1>
        <button className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold">
          Get Started
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4 pb-8">
        {['Web Design', 'Web Development', 'Digital Marketing', 'SEO Services', 'Content Writing'].map((service, index) => (
          <div key={index} className={`px-6 py-3 rounded-lg ${index === 3 ? 'bg-blue-500 text-white' : 'bg-white text-blue-900'}`}>
            {service}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
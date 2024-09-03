import React from 'react';

const Value = () => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="flex items-center bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl mx-auto">
        <img
          src="ss.png"
          alt="Students and Graduates"
          className="w-2/5 h-auto object-cover" 
        />
        <div className="p-8 w-full ">
          <h2 className="text-2xl font-bold mb-2">
            Get a 30-minute, no-cost strategy session with a Data and AI services expert
          </h2>
          <p className="text-lg mb-4">
            Get started by talking to our experts about how to enable business insights at scale with the right data foundation, modernization and platform management.
          </p>
          <a href="/careers" className="text-orange-500 font-semibold hover:underline">
            Learn more →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Value;

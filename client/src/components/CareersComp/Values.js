import React from 'react';

const Values = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-16 p-8 bg-white">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold mb-4">We are principled</h2>
            <p className="text-lg text-gray-700 mb-4">
              From our hiring decisions to our interactions with each other, our customers, and our partners, we are guided by a clear set of principles integrity, kindness, pragmatism, humility, vision, execution, communication, beauty, and reflection. 
            </p>
            <h3 className="text-2xl font-semibold mb-2">What it means to you</h3>
            <p className="text-lg text-gray-700">
              Built on Principles. Our principles create a common language and frame of reference for our employees. You will work in a professional, kind, and supportive environment, encouraged to collectively focus on shared goals.
            </p>
          </div>
          <div className="relative max-w-xl">
            <img src="careerswhyus2.jpeg" alt="office" className="rounded-lg"/>
            <button className="absolute inset-0 flex items-center justify-center w-full h-full rounded-lg">
    
            </button>
          </div>
        </div>
    );
};

export default Values;

import React from "react";
import { valuesData } from "../../InformationFiles/CareersInfo"; // Adjust the path as needed

const Values = () => {
  return (
    <div className="bg-white py-8 sm:py-12">
      {/* Reduced padding for smaller screens */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8"> 
        <div className="flex flex-row items-start justify-between space-x-4 sm:space-x-8 lg:space-x-12">
          {/* Text Section */}
          <div className="w-1/2">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4" style={{ fontFamily: 'inherit' }}>
              {valuesData.title}
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-700 mb-3 sm:mb-6" style={{ fontFamily: 'inherit' }}>
              {valuesData.description}
            </p>
            <h3 className="text-lg sm:text-xl lg:text-4xl font-semibold mb-2 sm:mb-4" style={{ fontFamily: 'inherit' }}>
              {valuesData.whatItMeans.title}
            </h3>
            <p className="text-sm sm:text-base lg:text-xl text-gray-700" style={{ fontFamily: 'inherit' }}>
              {valuesData.whatItMeans.text}
            </p>
          </div>

          {/* Image Section */}
          <div className="w-1/2 p-2 sm:p-4">
            <div className="relative">
              <img
                src={valuesData.image.src}
                alt={valuesData.image.alt}
                className="rounded-lg object-cover w-full h-auto"
              />
              <button className="absolute inset-0 flex items-center justify-center w-full h-full rounded-lg">
                {/* Optional button functionality */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Values;

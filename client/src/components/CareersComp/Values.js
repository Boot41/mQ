import React from "react";
import { valuesData } from "../../InformationFiles/CareersInfo"; // Adjust the path as needed

const Values = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start justify-between space-y-8 lg:space-y-0 lg:space-x-12">
          {/* Text Section */}
          <div className="lg:w-1/2 w-full">
            <h2 className="text-3xl font-bold mb-6">{valuesData.title}</h2>
            <p className="text-lg text-gray-700 mb-6">
              {valuesData.description}
            </p>
            <h3 className="text-2xl font-semibold mb-4">
              {valuesData.whatItMeans.title}
            </h3>
            <p className="text-lg text-gray-700">
              {valuesData.whatItMeans.text}
            </p>
          </div>

          {/* Image Section */}
          <div className="relative lg:w-1/2 w-full flex items-center justify-center">
            <img
              src={valuesData.image.src}
              alt={valuesData.image.alt}
              className="rounded-lg w-full h-auto max-h-[300px] object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center w-full h-full rounded-lg">
              {/* Optional button functionality */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Values;

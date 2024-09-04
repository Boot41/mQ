import React from "react";
import { valuesData } from "../../InformationFiles/CareersInfo"; // Adjust the path as needed

const Values = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-16 p-8 bg-white">
      <div className="max-w-lg">
        <h2 className="text-3xl font-bold mb-4">{valuesData.title}</h2>
        <p className="text-lg text-gray-700 mb-4">{valuesData.description}</p>
        <h3 className="text-2xl font-semibold mb-2">
          {valuesData.whatItMeans.title}
        </h3>
        <p className="text-lg text-gray-700">{valuesData.whatItMeans.text}</p>
      </div>
      <div className="relative max-w-xl">
        <img
          src={valuesData.image.src}
          alt={valuesData.image.alt}
          className="rounded-lg"
        />
        <button className="absolute inset-0 flex items-center justify-center w-full h-full rounded-lg">
          {/* Add button content or functionality here if needed */}
        </button>
      </div>
    </div>
  );
};

export default Values;

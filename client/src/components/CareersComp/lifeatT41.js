import React from "react";

import { LifeAtT41 } from "../../InformationFiles/CareersInfo";

const OurAds = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">{LifeAtT41.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{LifeAtT41.description}</p>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="w-full md:w-1/2 space-y-6">
            {LifeAtT41.content.map((item, index) => (
              <p key={index} className="text-gray-600">
                {item.text}
              </p>
            ))}
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            {LifeAtT41.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div
                  className={`flex-none w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 ${
                    highlight.percentage
                      ? "text-center flex items-center justify-center text-2xl font-bold text-white"
                      : ""
                  }`}
                >
                  {highlight.percentage}
                </div>
                <div>
                  <h3 className="font-semibold">{highlight.title}</h3>
                  <p className="text-gray-600">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurAds;

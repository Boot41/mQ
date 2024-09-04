import React from "react";
import { CompanyStats } from "../../InformationFiles/AboutUsInfo";

const CompStats = () => {
  return (
    <div className="w-full bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          About Venture Capital
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          Capital Group is a distinguished venture capital company that
          specializes in providing early-stage and growth-stage funding to
          transformative startups across various sectors. With a proven track
          record of successful investments, we are committed to fueling the
          growth of innovative ventures that bring disruptive solutions to the
          market.
        </p>
        <div className="flex justify-between items-center">
          {CompanyStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="relative inline-block">
                <div className="w-60 h-60 rounded-full border-2 border-gray-200 flex flex-col items-center justify-center relative bg-white">
                  <span
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-3 rounded-full bg-orange-400 ${stat.dotPosition}`}
                  ></span>
                  <span className="text-black font-bold text-5xl">
                    {stat.value}
                  </span>
                  <span className="text-gray-800 text-xl mt-2">
                    {stat.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompStats;

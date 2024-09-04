import React from "react";
// import JobList from '../CareersComp/Openpositions';
import { jobs } from "../../InformationFiles/CareersInfo";

const OpenPositions = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-2/3">
      <div className="px-6 py-4 border-b">
        <h2 className="text-2xl font-bold">Open Positions</h2>
      </div>
      <div className="px-6 py-4 space-y-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="border-b pb-4 flex justify-between items-center transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <div>
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p className="text-gray-500">
                {job.type} - {job.location} - Apply by {job.applyBy}
              </p>
            </div>
            <a
              href="#"
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center transition-colors"
            >
              Apply
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const HeroImage = () => {
  return (
    <div className="relative w-1/3 h-7xl">
      <img
        src="careersopenpositions.jpeg"
        alt="Hero Image"
        className="w-full h-full object-cover rounded-lg"
      />
      <div
        className="absolute inset-0 flex flex-col justify-center items-center text-center bg-transparent p-4"
        style={{ fontFamily: "Open Sans, sans-serif" }}
      >
        <h2 className="text-white text-2xl font-bold mb-4">
          Want to explore more open positions?
        </h2>
        <p className="text-white text-base mb-4">
          Explore new career opportunities and find the perfect job for you.
          Discover positions that match your skills and interests.
        </p>
        <a
          href="/openpositions"
          className="bg-white text-black px-5 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
        >
          Explore More &rarr;
        </a>
      </div>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap");
      `}</style>
    </div>
  );
};

const JobListings = () => {
  return (
    <div className="flex items-center justify-center h-90">
      <div className="flex w-full max-w-7xl">
        <HeroImage />
        <OpenPositions />
      </div>
    </div>
  );
};

export default JobListings;

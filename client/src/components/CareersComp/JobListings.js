import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jobs } from "../../InformationFiles/CareersInfo";
import LazyLoad from 'react-lazyload';

const OpenPositions = () => {
  const [randomJobs, setRandomJobs] = useState([]);

  useEffect(() => {
    const getRandomJobs = (allJobs, count) => {
      const shuffled = [...allJobs].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    setRandomJobs(getRandomJobs(jobs, Math.min(jobs.length, 5)));
  }, []);

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full lg:w-2/3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
        <div className="px-6 py-4 border-b">
          <h2 className="text-2xl font-bold text-center">Open Positions</h2>
          <div className="w-24 h-1 bg-orange-400 mx-auto mb-4"></div>
        </div>
        <div className="px-6 py-4">
          <p>There are currently no open positions.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full lg:w-2/3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      <div className="px-6 py-4 border-b">
        <h2 className="text-4xl text-center font-bold mb-4">Open Positions</h2>
        <div className="w-32 h-1 bg-orange-400 mx-auto mb-4"></div>
      </div>
      <div className="px-6 py-4 space-y-4">
        {randomJobs.map((job, index) => (
          <div
            key={index}
            className="border-b pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <div className="mb-2 sm:mb-0">
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p className="text-gray-500">
                {job.type} - Apply by {job.applyBy}
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
    <div className="relative w-76 lg:w-1/3 flex flex-col" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      <div className="relative flex-1">
        <LazyLoad height={200} once>
          <img
            src="static/r3.webp"
            alt="Hero Image"
            className="w-full h-full object-cover rounded-lg"
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </LazyLoad>
        <div className="absolute inset-0 bg-gray-200 opacity-30 rounded-lg"></div>
      </div>
      
      <div
        className="absolute inset-0 flex flex-col justify-center items-center text-center p-4"
        style={{ fontFamily: 'Open Sans, sans-serif', zIndex: 1 }}
      >
        <h2 className="text-white text-xl lg:text-2xl font-bold mb-2 lg:mb-4">
          Want to explore more open positions?
        </h2>
        <p className="text-white text-sm lg:text-base mb-2 lg:mb-4">
          Explore new career opportunities and find the perfect job for you.
          Discover positions that match your skills and interests.
        </p>
        <Link
          to="/openpositions"
          className="bg-white text-black px-4 py-2 lg:px-5 lg:py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors text-sm lg:text-base"
        >
          Explore More &rarr;
        </Link>
      </div>
    </div>
  );
};

const JobListings = () => {
  return (
    <div className="flex items-center justify-center py-4 px-4" style={{ margin: 0, minHeight: 'auto' }}>
      <div className="flex flex-col lg:flex-row w-full max-w-7xl space-y-4 lg:space-y-0 lg:space-x-4">
        <HeroImage />
        <OpenPositions />
      </div>
    </div>
  );
};

export default JobListings;

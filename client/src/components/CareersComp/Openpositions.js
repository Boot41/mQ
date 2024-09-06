import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Briefcase, Calendar } from "lucide-react";
import { jobs } from "../../InformationFiles/CareersInfo"; // Ensure this path is correct

const JobList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto pt-12">
        <h1 className="text-5xl font-light text-center mb-12">
          Open positions  
        </h1>

        {/* Search Bar */}
        <div className="relative mb-12">
          <input
            type="text"
            placeholder="Search for jobs..."
            className="w-full p-4 pl-12 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <p className="text-lg text-gray-700 mb-12 text-center">
          We are passionate about innovation, creativity, and excellence. We
          believe in fostering a collaborative and inclusive environment where
          every team member can thrive and contribute to the domain of our
          mission. Explore our current job openings below and find the perfect
          opportunity to grow your career with us.
        </p>

        <div className="space-y-6">
          {filteredJobs.map((job, index) => (
            <Link to="/contact-us" key={index} className="block group">
              <div className="p-6 bg-white border border-gray-200 rounded-lg transition-all duration-300 transform hover:scale-102 hover:shadow-lg">
                <div className="flex flex-col h-full">
                  <p className="text-base text-gray-700 mb-4 flex-grow">
                    {job.description}
                  </p>
                  <div className="flex flex-col mt-4">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Briefcase className="mr-2 w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="mr-2 w-4 h-4" />
                      <span>Application Deadline: {new Date(job.applyBy).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="mt-4 text-orange-500 font-medium group-hover:underline">
                    Apply Now
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobList;

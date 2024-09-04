import React from "react";

import { LifeAtT41 } from "../../InformationFiles/CareersInfo";

const OurAds = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">LIFE AT THINK 41</h2>
        <p className="text-xl text-gray-600 mb-8">Reach your audience at their most engaged</p>

        {/* Left Column */}
        <div className="flex flex-col md:flex-row gap-8 mt-12">
          <div className="w-full md:w-1/2 space-y-6">
            <img 
              src="/path-to-your-image.jpg" 
              alt="Life at Think 41" 
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <p className="text-gray-600">
              Unlock the full value of today's modern workforce in both onsite and hybrid environments. Lenovo's Deployment Services provide a scalable, easy-to-customize service model that's designed to help close technology gaps, lower the burden on your IT department, and support the teams they work with.
            </p>
            <p className="text-gray-600">
              Unlock the full value of today's modern workforce in both onsite and hybrid environments. Lenovo's Deployment Services provide a scalable, easy-to-customize service model that's designed to help close technology gaps, lower the burden on your IT department, and support the teams they work with.
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">Our Approach</h3>
            <p className="text-gray-600 mb-4">
              At Think 41, we believe in creating an environment that fosters innovation, collaboration, and personal growth. Our approach to work-life balance and employee satisfaction sets us apart in the industry.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Flexible work hours and remote options</li>
              <li>Continuous learning and development programs</li>
              <li>Regular team-building activities and events</li>
              <li>Competitive benefits and compensation packages</li>
            </ul>
            <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
            <p className="text-gray-600 mb-4">
              We're always looking for talented individuals to join our dynamic team. If you're passionate about innovation and want to make a difference, we'd love to hear from you.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
              View Open Positions
            </button>
          </div>
        </div>

        {/* Four points in horizontal layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm">
            <div className="flex-none w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-center flex items-center justify-center text-xl font-bold text-white">
              5%
            </div>
            <div>
              <h3 className="font-semibold text-base">SINGLE AD BREAKS</h3>
              <p className="text-sm text-gray-600">Front and center</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm">
            <div className="flex-none w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-center flex items-center justify-center text-xl font-bold text-white">
              5%
            </div>
            <div>
              <h3 className="font-semibold text-base">LOW AD LOAD</h3>
              <p className="text-sm text-gray-600">5% viewing time</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm">
            <div className="flex-none w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-center flex items-center justify-center text-xl font-bold text-white">
              5%
            </div>
            <div>
              <h3 className="font-semibold text-base">SINGLE AD BREAKS</h3>
              <p className="text-sm text-gray-600">Front and center</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm">
            <div className="flex-none w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-center flex items-center justify-center text-xl font-bold text-white">
              5%
            </div>
            <div>
              <h3 className="font-semibold text-base">NON-SKIPPABLE</h3>
              <p className="text-sm text-gray-600">Guaranteed views</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurAds;

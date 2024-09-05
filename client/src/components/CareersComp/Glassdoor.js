import React from 'react';
import { ExternalLink } from 'lucide-react';

const GlassdoorRating = () => {
  return (
    <div className="flex items-center bg-gray-100 h-[90px] w-full py-4 shadow-md">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <span className="text-xl font-bold text-gray-800 mr-3">Glassdoor Rating:</span>
          <span className="text-3xl font-bold text-green-600">4.5</span>
        </div>
        <div className="flex items-center">
          <img
            src="https://www.glassdoor.co.in/pc-app/static/img/partnerCenter/badges/eng_CHECK_US_157x30.png"
            alt="Glassdoor Check Us Out"
            className="h-8 mr-4"
          />
          <a
            href="https://www.glassdoor.com/Overview/Working-at-Think41-EI_IE9960597.11,18.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
          >
            View on Glassdoor
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GlassdoorRating;

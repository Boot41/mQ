import React from 'react';
import { ExternalLink } from 'lucide-react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const GlassdoorRating = () => {
  const rating = 4.5; // Rating value
  const totalStars = 5; // Total number of stars for the rating

  return (
    <div className="flex items-center bg-gray-100 h-[90px] w-full py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-bold text-gray-800 mr-3">Glassdoor Rating:</span>
          <div className="flex items-center">
            {[...Array(totalStars)].map((_, index) => {
              if (index < Math.floor(rating)) {
                return (
                  <a
                    key={index}
                    href="https://www.glassdoor.com/Overview/Working-at-Think41-EI_IE9960597.11,18.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-yellow-500 text-3xl"
                  >
                    <FaStar />
                  </a>
                );
              }
              if (index === Math.floor(rating) && rating % 1 !== 0) {
                return (
                  <a
                    key={index}
                    href="https://www.glassdoor.com/Overview/Working-at-Think41-EI_IE9960597.11,18.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-yellow-500 text-3xl"
                  >
                    <FaStarHalfAlt />
                  </a>
                );
              }
              return (
                <a
                  key={index}
                  href="https://www.glassdoor.com/Overview/Working-at-Think41-EI_IE9960597.11,18.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-gray-300 text-3xl"
                >
                  <FaStar />
                </a>
              );
            })}
          </div>
        </div>
        <a
          href="https://www.glassdoor.com/Overview/Working-at-Think41-EI_IE9960597.11,18.htm"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-500 hover:text-blue-600 transition duration-300"
        >
          <img
            src="https://www.glassdoor.co.in/pc-app/static/img/partnerCenter/badges/eng_CHECK_US_157x30.png"
            alt="Glassdoor Check Us Out"
            className="h-8 mr-2"
          />
          
        </a>
      </div>
    </div>
  );
};

export default GlassdoorRating;

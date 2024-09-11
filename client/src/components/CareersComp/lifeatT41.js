import React from "react";
import {
  FaClock,
  FaUtensils,
  FaLightbulb,
  FaSmile,
  FaHeartbeat,
} from "react-icons/fa";

const OurAds = () => {
  const benefits = [
    "Flexible Work Hours",
    "Free Meals",
    "Incubator for New Ideas",
    "Fun With Purpose",
    "Health and Wellness Programs",
  ];

  return (
    <div className="bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Life At Think 41</h2>
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
          At Think41, work is a blend of creativity, collaboration, and growth.
          Dive into a vibrant environment where your ideas drive our mission,
          and every day is an opportunity to learn and have fun.
        </p>

        {/* Culture and Values */}
        <div className="flex flex-row md:flex-row gap-6 sm:gap-8 mt-8 sm:mt-12">
  {/* Left Column: Image */}
  <div className="w-full flex justify-center items-center md:w-1/2">
    <div className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] relative">
      <img
        src="static/careersabout.webp"
        alt="Life at Think 41"
        className="w-full h-auto object-cover rounded-lg md:max-h-[200px]"
      />
    </div>
  </div>

  {/* Right Column: Content */}
  <div className="w-full md:w-1/2 space-y-4 sm:space-y-6">
    <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Our Culture and Values</h3>
    <p className="text-base sm:text-lg text-gray-600">
      Our core values guide everything we do. We aim to Always Deliver Client Delight by exceeding expectations at every opportunity. We work to Earn Trust through transparency, reliability, and accountability. At Think41, we Play as a Team, believing that collaboration and mutual support drive the best results. We continuously strive to Be an Expert in our field, deliver high quality output, staying ahead of industry trends and advancing our skills. Finally, we Take Extreme Ownership of our actions, ensuring responsibility and commitment to delivering the best outcomes.
    </p>
  </div>
</div>









        {/* Four Key Benefits */}
        <div className="flex flex-wrap justify-between mt-12 sm:mt-20 pt-8 sm:pt-12 gap-4"> 
          {[
            { title: "Flexible Work Hours" },
            { title: "Free Meals" },
            { title: "Incubator for New Ideas" },
            { title: "Fun With Purpose" },
            { title: "Health and Wellness Programs" },
          ].map((benefit, index) => (
            <div
              key={index}
              className="flex items-center p-2 border rounded-lg shadow-sm bg-white h-16 sm:h-20 w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(20%-16px)]"
            >
              <div className="flex-none w-2 h-8 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-lg font-bold text-white">
                <span className="text-sm">✓</span>
              </div>
                            <div className="ml-2">
                <h3 className="font-semibold text-xs sm:text-sm">{benefit.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurAds;


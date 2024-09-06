import React from "react";

const OurAds = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-3xl font-bold mb-4">LIFE AT THINK 41</h2>
        <p className="text-xl text-gray-600 mb-8">
        At Think41, work is a blend of creativity, collaboration, and growth. Dive into a vibrant environment where your ideas drive our mission, and every day is an opportunity to learn and have fun.
        </p>

        {/* Culture and Values */}
        <div className="flex flex-col md:flex-row gap-8 mt-12">
          {/* Left Column: Image */}
          <div className="w-full md:w-1/2">
            <img
              src="careersabout.webp"
              alt="Life at Think 41"
              className="w-full h-[200px] object-cover rounded-lg"
            />
          </div>
          
          {/* Right Column: Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h3 className="text-2xl font-bold mb-4">Our Culture and Values</h3>
            <p className="text-gray-600">
            Our core values guide everything we do. We aim to Always Deliver Client Delight by exceeding expectations at every opportunity. We work to Earn Trust through transparency, reliability, and accountability. At Think41, we Play as a Team, believing that collaboration and mutual support drive the best results. We continuously strive to Be an Expert in our field, deliver high quality output, staying ahead of industry trends and advancing our skills. Finally, we Take Extreme Ownership of our actions, ensuring responsibility and commitment to delivering the best outcomes.

            </p>
          </div>
        </div>

        {/* Four Key Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-24 pt-12 border-t border-gray-200">{[{ title: "Flexible Work Hours" }, { title: "Free Meals" }, { title: "Incubator for New Ideas" }, { title: "Fun With Purpose" }, { title: "Health and Wellness Programs" }].map((benefit, index) => (<div key={index} className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-white"><div className="flex-none w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-center flex items-center justify-center text-xl font-bold text-white"><span className="text-2xl">✓</span></div><div><h3 className="font-semibold text-lg">{benefit.title}</h3></div></div>))}</div>


      </div>
    </div>
  );
};

export default OurAds;
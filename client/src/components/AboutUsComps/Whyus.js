import React from 'react';

const KnowAboutUsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Us
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <div className="max-w-4xl sm:max-w-5xl md:max-w-6xl mx-auto">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 text-justify">
              We are a Full Stack Gen AI organisation. We build systems and software that help Humans and AI collaborate better, with a goal to improve human experience and create a more fulfilling work environment. Our tools, systems and platforms further that goal and help us operate like a One Team, that can deliver higher quality results faster.
            </p>
          </div>
        </div>
      </div>
      {/* Responsive margin-top adjustments */}
      <div className="relative mt-[-40px] sm:mt-[-60px] md:mt-[-80px] lg:mt-[-100px]"></div>
    </section>
  );
};

export default KnowAboutUsSection;

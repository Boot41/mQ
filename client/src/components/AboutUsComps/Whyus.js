import React from 'react';

const KnowAboutUsSection = () => {
  return (
    <section className="py-16 pb-0 bg-white mb-0">
      <div className="container mx-auto px-4 sm:px-4 lg:px-6 mb-0">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-2">
            About Us
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-4"></div>
          <div className="max-w-6xl text-2xl mx-auto text-center">
            <p className="text-gray-700 mb-0 text-justify">
              We are a Full Stack Gen AI organisation. We build systems and software that help Humans and AI collaborate better, with a goal to improve human experience and create a more fulfilling work environment. Our tools, systems and platforms further that goal and help us operate like a One Team, that can deliver higher quality results faster.
            </p>
          </div>
        </div>
        {/* Add negative margin to reduce space below */}
        <div className="mt-[-75px]"></div>
      </div>
    </section>
  );
};

export default KnowAboutUsSection;

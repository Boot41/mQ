import React from "react";

const KnowAboutUsSection = () => {
  return (
    <section className="py-16 pb-0 bg-white mb-0" style={{ fontFamily: 'inherit' }}>
      <div className="container mx-auto px-4 sm:px-4 lg:px-6 mb-0">
        <div className="text-center" style={{ fontFamily: 'inherit' }}>
          <h2 className="text-5xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'inherit' }}>
            Who are we?
          </h2>
          <div className="w-32 h-1 bg-orange-500 mx-auto mb-4"></div>
          <div className="max-w-6xl text-2xl mx-auto text-center" style={{ fontFamily: 'inherit' }}>
            <p className="text-gray-700 mb-0 text-justify" style={{ fontFamily: 'inherit' }}>
              We are a Full Stack Gen AI organisation. We build systems and
              software that help Humans and AI collaborate better, with a goal
              to improve human experience and create a more fulfilling work
              environment. Our tools, systems and platforms further that goal
              and help us operate like a One Team, that can deliver higher
              quality results faster.
            </p>
          </div>
        </div>
        {/* Add negative margin to reduce space below */}
        <div className="mt-[-70px]"></div>
      </div>
    </section>
  );
};

export default KnowAboutUsSection;

import React, { useState } from 'react';

const CareersHero = () => (
    <div className="bg-white py-20">
      <header className="text-center mb-8 px-6">
        <h1 className="text-3xl font-medium mb-4">Careers at Think 41</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-700">
          From machine learning operations and organizational change to ethical considerations and emerging use cases, this is QuantumBlack, AI by McKinsey's latest thinking on how organizations can most effectively and responsibly use AI to create business value.
        </p>
      </header>
      <section className="max-w-7xl mx-auto">
        <div className="border-t border-gray-300 mt-8 mb-4">
          <h2 className="text-sm font-medium mt-4">THE T41 ADVANTAGE</h2>
        </div>
        <div className="relative overflow-visible">
          <img
            src="ai1.png"
            alt="Featured AI"
            className="w-full h-96 object-cover"
          />
          <div className="bg-white p-16 absolute top-80 left-1/2 transform -translate-x-1/2 shadow-xl rounded-lg max-w-3xl w-11/12">
            <h3 className="text-2xl text-center font-bold">Why Think 41</h3>
            <p className="mt-6 text-gray-600">
              Which technology trends matter most for companies in 2024? New analysis highlights the adoption, development, and industry effects of advanced technologies.
              This extended content ensures that even if the text is longer, it will be fully displayed without clipping.Which technology trends matter most for companies in 2024? New analysis highlights the adoption, development, and industry effects of advanced technologies.
              This extended content ensures that even if the text is longer, it will be fully displayed without clipping.
            </p>
            <a href="#" className="text-orange-500 mt-6 inline-block">Explore Opportunities &rarr;</a>
          </div>
        </div>
      </section>
      <div className="py-20"></div>
      <div className="py-20"></div>
    </div>
  );
  export default CareersHero
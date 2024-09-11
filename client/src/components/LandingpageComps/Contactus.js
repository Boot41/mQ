import React from 'react';

const ConnectSection = () => {
  return (
    <div className="mx-auto relative bg-center bg-no-repeat bg-cover w-3/4" style={{ backgroundImage: 'url(static/contact.png)' }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative flex flex-col items-center justify-center h-70 p-8 text-white max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center">Connect with Think41</h1>
        <p className="mt-4 text-lg text-center">
          Together we can make sure the world thrives.
        </p>
        <a href="/contact">
          <button className="mt-6 px-6 py-2 text-lg font-medium text-white border border-white bg-transparent rounded hover:bg-white hover:text-blue-600 transition-colors duration-300">
            Contact us →
          </button>
        </a>
      </div>
    </div>
  );
};

export default ConnectSection;

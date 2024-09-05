import React from "react";

const NoOpenPositions = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-2/3 p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Sorry, We Don't Have Any Open Positions Right Now</h2>
      <p className="text-gray-600 mb-6">
        We are a rapidly growing company, so do reach out to us. We may have opportunities that are not listed yet!
      </p>
      <a
        href="https://forms.gle/your-google-form-link"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full"
      >
        Reach Out to Us
      </a>
    </div>
  );
};

export default NoOpenPositions;

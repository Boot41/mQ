import React from 'react';

const FreightCompanySection = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Freight Company With a Difference. Innovation.</h2>
          <p className="text-gray-600 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded font-semibold">READ MORE</button>
        </div>
        <div className="flex space-x-6">
          <div className="flex-1">
            <img src="/api/placeholder/400/300" alt="Blue container" className="w-full h-48 object-cover mb-4" />
            <h3 className="font-bold text-blue-900 mb-2 text-lg">Ocean Freight</h3>
            <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="flex-1">
            <img src="/api/placeholder/400/300" alt="Red container crane" className="w-full h-48 object-cover mb-4" />
            <h3 className="font-bold text-blue-900 mb-2 text-lg">Land Transport</h3>
            <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div className="flex mt-4 justify-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default FreightCompanySection;
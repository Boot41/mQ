import React from 'react';

const EventsSection = () => {
  return (
    <div className="px-8 py-10">
      <h2 className="text-2xl font-bold mb-4">Key Upcoming Events</h2>
      <p className="text-gray-700 mb-8">Events to be added shortly.</p>
      
      <h3 className="text-xl font-bold mb-4">Environmental, Social and Governance</h3>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 md:w-1/2 hover:shadow-xl transition-shadow duration-300 relative">
          <h4 className="text-lg font-bold mb-2">2023 Global Impact Report - Our Purpose in Action</h4>
          <p className="text-gray-700 mb-4">Send me an invite</p>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500"></div>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6 md:w-1/2 hover:shadow-xl transition-shadow duration-300 relative">
          <h4 className="text-lg font-bold mb-2">Responsible Tech Playbook</h4>
          <p className="text-orange-500 mb-4">Send me an invite</p>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500"></div>
        </div>
      </div>
    </div>
  );
};

export default EventsSection;

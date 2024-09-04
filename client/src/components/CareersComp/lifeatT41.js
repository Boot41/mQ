import React from 'react';

const OurAds = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">LIFE AT THINK 41</h2>
        <p className="text-xl text-gray-600 mb-8">Reach your audience at their most engaged</p>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="w-full md:w-1/2 space-y-6">
            <p className="text-gray-600">
              Unlock the full value of today’s modern workforce in both onsite and hybrid environments. Lenovo’s Deployment Services provide a scalable, easy-to-customize service model that’s designed to help close technology gaps, lower the burden on your IT department, and support the teams they work with.
            </p>
            <p className="text-gray-600">
              Unlock the full value of today’s modern workforce in both onsite and hybrid environments. Lenovo’s Deployment Services provide a scalable, easy-to-customize service model that’s designed to help close technology gaps, lower the burden on your IT department, and support the teams they work with.
            </p>
            <p className="text-gray-600">
              Unlock the full value of today’s modern workforce in both onsite and hybrid environments. Lenovo’s Deployment Services provide a scalable, easy-to-customize service model that’s designed to help close technology gaps, lower the burden on your IT department, and support the teams they work with.
            </p>
          </div>
          
          {/* Right Column */}
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
  {/* Row 1 - Column 1 */}
  <div className="flex items-center space-x-4">
    <div className="flex-none w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-600"></div>
    <div>
      <h3 className="font-semibold">SINGLE AD COMMERCIAL BREAKS</h3>
      <p className="text-gray-600">Your ad will be front and center...</p>
    </div>
  </div>
  
  {/* Row 1 - Column 2 */}
  <div className="flex items-center space-x-4">
    <div className="flex-none w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-center flex items-center justify-center text-2xl font-bold text-white">
      5%
    </div>
    <div>
      <h3 className="font-semibold">LOW AD LOAD</h3>
      <p className="text-gray-600">5% of viewing time is dedicated to ads...</p>
    </div>
  </div>
  
  {/* Row 2 - Column 1 */}
  <div className="flex items-center space-x-4">
    <div className="flex-none w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-600"></div>
    <div>
      <h3 className="font-semibold">SINGLE AD COMMERCIAL BREAKS</h3>
      <p className="text-gray-600">Your ad will be front and center...</p>
    </div>
  </div>
  
  {/* Row 2 - Column 2 */}
  <div className="flex items-center space-x-4">
    <div className="flex-none w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-600"></div>
    <div>
      <h3 className="font-semibold">NON-SKIPPABLE</h3>
      <p className="text-gray-600">Non-skippable commercials guarantee...</p>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default OurAds;

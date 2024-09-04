import React from 'react';

const InfoSection = () => {
  return (
    <section className="px-6 py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-left mb-8 flex flex-col md:flex-row">
            <div className="md:w-2/3">
              <h1 className="text-5xl font-light text-gray-900 mt-2">
                Good Environment to Building
              </h1>
              <h1 className="text-5xl font-light text-gray-900 mt-2">
                Boot 41
              </h1>
            </div>
            <div className="md:w-1/2 mt-2 md:mt-0 md:pl-8">
              <p className="text-lg text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                convallis ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus.
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column */}
            <div className="md:w-1/2 flex flex-col gap-8">
              {/* Card 1 */}
              <div className="p-6 bg-blue-50 rounded-xl shadow-md flex flex-col h-[25rem] w-[35rem]">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    <span className="text-2xl">🔵</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 ml-4">
                    Working Benefit
                  </h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non
                  ultrices leo. Aliquam porta nulla.
                </p>
                <a className="text-blue-600 hover:text-blue-800" href="/">
                  Learn More →
                </a>
              </div>

              {/* Card 2 */}
              <div className="p-6 bg-blue-100 rounded-xl shadow-md flex flex-col h-[25rem] w-[75rem]">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    <span className="text-2xl">🔵</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 ml-4">
                    Good Environment
                  </h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non
                  ultrices leo. Aliquam porta nulla.
                </p>
                <a className="text-blue-600 hover:text-blue-800" href="/">
                  Learn More →
                </a>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:w-1/2">
              <img
                src="a1.png"
                alt="Description of the image"
                className="w-[30rem] h-[25rem] object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;

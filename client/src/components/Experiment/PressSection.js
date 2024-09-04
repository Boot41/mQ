import React from 'react';

const PressSection = () => {
  return (
    <section className="px-6 py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Press Release</h1>
          <a href="/" className="bg- gray text-sm text-gray-600 hover:underline">
            SEE ALL
          </a>
        </div>

        <div className="flex space-x-4">
  {/* Card 1 */}
  <div className="rounded-lg shadow-md overflow-hidden flex flex-col w-full max-w-50">
    <img
      src="news.jpeg" // Replace with actual image path
      alt="Success"
      className="w-full h-48 object-cover"
    />
    <div className="p-6 flex-grow">
      <h2 className="text-xl font-bold text-gray-900 mb-3">
        How To Measure Success
      </h2>
      <p className="text-gray-700 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget nisl non orci scelerisque blandit vel id lacus.
      </p>
      <a className="text-blue-600 hover:underline mt-auto" href="/">
        Read More
      </a>
    </div>
  </div>

  {/* Card 2 */}
  <div className="rounded-lg shadow-md overflow-hidden flex flex-col w-full max-w-50">
    <img
      src="news3.jpeg" // Replace with actual image path
      alt="Success"
      className="w-full h-48 object-cover"
    />
    <div className="p-6 flex-grow">
      <h2 className="text-xl font-bold text-gray-900 mb-3">
        How To Measure Success
      </h2>
      <p className="text-gray-700 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget nisl non orci scelerisque blandit vel id lacus.
      </p>
      <a className="text-blue-600 hover:underline mt-auto" href="/">
        Read More
      </a>
    </div>
  </div>

  {/* Card 3 */}
  <div className="rounded-lg shadow-md overflow-hidden flex flex-col w-full max-w-50">
    <img
      src="a3.png" // Replace with actual image path
      alt="Success"
      className="w-full h-48 object-cover"
    />
    <div className="p-6 flex-grow">
      <h2 className="text-xl font-bold text-gray-900 mb-3">
        How To Measure Success
      </h2>
      <p className="text-gray-700 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget nisl non orci scelerisque blandit vel id lacus.
      </p>
      <a className="text-blue-600 hover:underline mt-auto" href="/">
        Read More
      </a>
    </div>
  </div>
</div>

      </div>
    </section>
  );
};

export default PressSection;

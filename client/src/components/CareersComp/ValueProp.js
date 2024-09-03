import React from 'react';

const ProcessSection = () => (
  <div className="container mx-auto px-8 py-16">
    <div className="flex flex-col md:flex-row items-center md:justify-center">
      {/* Image Section */}
      <div className="md:w-1/3 flex justify-center">
        <img src="office.jpg" alt="Person using tablet" className="rounded-lg shadow-lg" />
      </div>
      {/* Text Section */}
      <div className="md:w-1/3 md:pl-8 mt-8 md:mt-0">
        <h2 className="text-sm uppercase text-gray-500 mb-2">LIFE AT THINK41</h2>
        <h3 className="text-3xl font-bold mb-4">Explore Life at the most happening place</h3>
        <p className="text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <ul className="space-y-4">
          {[1, 2, 3].map((item) => (
            <li key={item} className="flex items-start">
              <svg className="w-5 h-5 text-purple-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const StepSection = () => {
  const steps = [
    { number: '01', title: 'Create a Profile', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus mattis.' },
    { number: '02', title: 'Browse Jobs', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus mattis.' },
    { number: '03', title: 'Apply to Jobs', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus mattis.' },
    { number: '04', title: 'Get Hired', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus mattis.' },
  ];

  return (
    <div className="container mx-auto px-5 py-16">
      <div className="flex justify-between items-center flex-wrap gap-8 max-w-4xl mx-auto">
        {steps.map((step) => (
          <div key={step.number} className="text-center flex-1 min-w-[200px]">
            <div className="text-purple-500 font-bold text-xl mb-2">{step.number}</div>
            <h4 className="font-bold text-lg mb-2">{step.title}</h4>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

  
    
  
export default StepSection;


export { ProcessSection };

import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: '30+', title: 'World awards', description: 'Showcasing unmatched key performance indicators.' },
    { number: '99%', title: 'Project success', description: 'Ensuring fully tested process improvement platforms.' },
    { number: '60+', title: 'Employees', description: 'Leveraging diverse resources for maximum convergence.' },
    { number: '200', title: 'Worldwide clients', description: 'Globally networked focused market products.' },
    { number: '150+', title: 'Completed projects', description: 'Delivering exceptional value across industries.' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex-1 max-w-xs bg-white p-6 rounded-lg shadow-md flex flex-col justify-between text-center"
            >
              <div>
                <h3 className="text-3xl font-bold text-yellow-500">{stat.number}</h3>
                <h4 className="text-xl font-semibold text-gray-900 mt-2">{stat.title}</h4>
                <p className="text-gray-700 mt-2">{stat.description}</p>
              </div>
              <div className="w-full h-1 bg-orange-500 mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const solutions = [
  {
    title: "Database and Analytics",
    description: "Accelerating queries and transactions to transform data into actionable insights",
    image: "a1.png"
  },
  {
    title: "Financial Services",
    description: "Placeholder description for Financial Services",
    image: "a2.png"
  },
  {
    title: "Product Design",
    description: "Placeholder description for Product Design",
    image: "a3.png"
  },
  {
    title: "HCI and Virtualization",
    description: "Placeholder description for HCI and Virtualization",
    image: "a4.png"
  },
  {
    title: "Supercomputing and Research",
    description: "Placeholder description for Supercomputing and Research",
    image: "about3.jpg"
  }
];

const FeaturedSolutionsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % solutions.length);
    }, 10000); // 10 seconds per slide

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="bg-black text-white mx-auto py-12 w-3/4 flex flex-col"
      style={{ height: '450px' }}
    >
      <h2 className="text-3xl font-bold mb-4 px-4 pt-8">Featured Solutions</h2>
      <div className="relative flex-grow overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={solutions[currentSlide].image}
              alt={solutions[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 flex flex-col justify-center px-8"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
            >
              <h3 className="text-2xl font-bold mb-2">
                {solutions[currentSlide].title}
              </h3>
              <p className="mb-4">{solutions[currentSlide].description}</p>
              <a href="#" className="text-gray-400 hover:underline">
                Learn More &gt;
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-4xl"
          onClick={() =>
            setCurrentSlide((currentSlide - 1 + solutions.length) % solutions.length)
          }
        >
          &lt;
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-4xl"
          onClick={() => setCurrentSlide((currentSlide + 1) % solutions.length)}
        >
          &gt;
        </button>
      </div>
      <div className="h-24 flex items-end">
        <div className="w-full px-8 pb-4">
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            {solutions.map((solution, index) => (
              <div key={index} className="flex flex-col items-center cursor-pointer">
                <span
                  className={`mb-2 ${index === currentSlide ? 'text-white' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                >
                  {solution.title}
                </span>
                <div className="w-32 h-0.5 bg-gray-700">
                  {index === currentSlide && (
                    <div
                      className="h-full bg-blue-500"
                      style={{
                        width: '100%',
                        transition: 'width 10s linear'
                      }}
                    ></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSolutionsSlider;

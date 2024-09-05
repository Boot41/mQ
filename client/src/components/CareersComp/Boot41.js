import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Boot41Slides } from "../../InformationFiles/CareersInfo";

const CarouselItem = ({ item }) => (
  <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg transition-transform duration-300 hover:shadow-xl">
    <img
      src={item.imageSrc}
      alt={item.alt}
      className="w-full object-cover rounded-lg mb-4"
      style={{ height: '200px' }} // Adjust the height value to be slightly smaller
    />
    <p className="text-base text-center text-gray-800 font-medium">{item.text}</p>
  </div>
);

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [items.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto py-6 px-4">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <CarouselItem item={item} />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md hover:bg-opacity-90 transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md hover:bg-opacity-90 transition-all"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const Boot41 = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 py-8 px-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-800">
          We create radical new technologies
          <br />
          to solve some of the world's
          <br />
          hardest problems
        </h1>
      </header>
      <main className="flex flex-col items-center w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row lg:justify-between w-full mb-8">
          <div className="text-2xl lg:text-3xl font-bold lg:mr-6 mb-4 lg:mb-0 text-gray-900">
            <p>Boot</p>
            <p>41</p>
          </div>
          <div className="text-base lg:text-lg lg:w-full text-gray-700">
            <p>
            Explanation: Bootcamps at Think41 are intense learning programs that transform new hires into Think41 professionals. It blends a work-hard, play-hard vibe with fun activities and deep dives into full-stack development and AI. You’ll connect with industry leaders, learn from peers, and develop a transformative mindset focused on AI's vast applications. The bootcamp  gives you the skills and mindset to thrive in our innovative, tech-driven environment.
            </p>
          </div>
        </div>
        <Carousel items={Boot41Slides} />
      </main>
    </div>
  );
};

export default Boot41;

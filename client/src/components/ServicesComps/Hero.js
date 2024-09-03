import React, { useEffect, useRef, useState } from 'react';
import Glide from '@glidejs/glide';
import { motion, AnimatePresence } from 'framer-motion';
import '@glidejs/glide/dist/css/glide.core.min.css';

const slides = [
  {
  title: "Tried. Trusted. Long Lasting.",
  description: "Our Gen AI solutions are engineered for longevity, with lifecycle support extending to 2040, 2045, and beyond.",
  buttonText: "Learn More"
},
{
  title: "Gen AI Radar",
  description: "Stay ahead of the curve with our cutting-edge Gen AI technology, designed to adapt and evolve with your needs.",
  buttonText: "Explore"
},
{
  title: "Unleash the Power of Gen AI",
  description: "Harness the potential of artificial intelligence to drive innovation and transform your business operations.",
  buttonText: "Discover"
},
];

const bottomSections = [
  "Our Services",
  "Resources",
  "T41 Advantage",
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const glideRef = useRef(null);
  const glideAutoplay = 5000;
  const lineAnimationDuration = glideAutoplay / 1000;

  useEffect(() => {
    glideRef.current = new Glide('.glide', {
      type: 'carousel',
      startAt: 0,
      perView: 1,
      autoplay: glideAutoplay,
      hoverpause: true,
      animationDuration: 1000,
    });

    glideRef.current.on('run.after', () => {
      setActiveIndex(glideRef.current.index);
    });

    glideRef.current.mount();

    return () => {
      glideRef.current.destroy();
    };
  }, []);

  const handleSectionClick = (index) => {
    setActiveIndex(index);
    glideRef.current.go(`=${index}`);
  };

  return (
    <div className="relative bg-black text-white h-[40vh]">
      {/* Glide Carousel */}
      <div className="glide h-full relative">
        <div className="glide__track h-[30vh]" data-glide-el="track">
          <ul className="glide__slides h-full">
            {slides.map((slide, index) => (
              <li key={index} className="glide__slide flex h-full">
                {/* Fixed Image on the Left */}
                <div className="w-1/2 h-full relative">
                  <img
                    src="shero2.jpg" // Ensure you have the correct path
                    alt="Hero Image"
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Black Background and Text on the Right */}
                <div className="w-1/2 h-full bg-black text-white flex items-center justify-center px-6">
                  <div className="max-w-lg text-center">
                    <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
                    <p className="text-xl mb-8">{slide.description}</p>
                    <button className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-700 transition duration-300">
                      {slide.buttonText}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Navigation Bullets and Line Animation */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-900 py-2 h-[100px]">
        <div className="container mx-auto">
          <div className="flex justify-between items-center relative">
            {bottomSections.map((section, index) => (
              <div
                key={index}
                className="text-sm font-semibold z-10 relative w-1/4 cursor-pointer"
                onClick={() => handleSectionClick(index)}
              >
                {section}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-orange-500 "
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      exit={{ width: '0%' }}
                      transition={{ duration: lineAnimationDuration, ease: 'linear' }}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

import React, { useState } from "react";
import { testimonials } from "../../InformationFiles/CareersInfo";

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const getVisibleTestimonials = () => {
    const visibleIndices = [
      (currentIndex - 1 + testimonials.length) % testimonials.length,
      currentIndex,
      (currentIndex + 1) % testimonials.length,
    ];
    return visibleIndices.map((index) => testimonials[index]);
  };

  return (
    <section className="py-16 bg-gray-200 relative overflow-hidden" style={{ fontFamily: 'inherit' }}>
      <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
        <h1 className="text-center text-5xl font-bold mb-4" style={{ fontFamily: 'inherit' }}>Thinker's Speak</h1>
        <div className="w-32 h-1 bg-orange-400 mx-auto mb-4"></div>
        <p className="text-xl text-orange-500 font-semibold mb-3 relative z-10" style={{ fontFamily: 'inherit' }}>
          What our employees have to say
        </p>

        <div className="flex justify-center items-center space-x-4">
          <button onClick={prevTestimonial} className="text-3xl" style={{ fontFamily: 'inherit' }}>
            &lt;
          </button>
          <div className="flex justify-center items-center space-x-4 md:flex-row flex-col">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-white p-6 rounded-lg shadow-lg ${
                  index === 1 ? "md:scale-110 z-10" : "md:scale-90 md:blur-[1px]"
                } transition-all duration-600 hover:scale-105 hover:shadow-2xl mb-4 md:mb-0`}
                style={{ width: "300px", maxWidth: "100%", fontFamily: 'inherit' }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mr-4"
                  />
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'inherit' }}>
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600" style={{ fontFamily: 'inherit' }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mt-2 text-left" style={{ fontFamily: 'inherit' }}>
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
          <button onClick={nextTestimonial} className="text-3xl" style={{ fontFamily: 'inherit' }}>
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;

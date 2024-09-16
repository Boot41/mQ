import React, { useState } from "react";

// Card Component
function Card({ title, description, image }) {
  const [isHovered, setIsHovered] = useState(false);

  // Function to style the title with custom colors
  const renderTitle = (title) => {
    return title.split('').map((char, index) => {
      if (char.toUpperCase() === 'P') {
        return <span key={index} className="text-orange-500">{char}</span>;
      }
      return <span key={index} className="text-gray-800">{char}</span>;
    });
  };

  return (
    <div
      className={`bg-white bg-opacity-90 backdrop-blur-md border border-gray-200 rounded-xl flex h-[200px] w-[300px] overflow-hidden transition-transform duration-300 ease-in-out ${
        isHovered ? "scale-105 shadow-2xl" : "scale-100 shadow-lg"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image section */}
      <div className="w-1/2 h-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full rounded-l-xl" // Rounded left side
        />
      </div>
      {/* Content section */}
      <div className="w-1/2 p-4 flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-2">
          {renderTitle(title)}
        </h3>
        <p className="text-base text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
}

// Data for the cards
const cards = [
  {
    title: "PRODUCTIVITY",
    description: "Accelerate business processes and streamline software development cycles through AI-driven automation and Agentic-led workflows to enhance efficiency and speed.",
    image: "static/Productivity.webp",
  },
  {
    title: "POSSIBILITIES",
    description: "Transform previously impossible use-cases into reality by enabling innovative solutions, such as fully automated initial interviews using Conversational AI.",
    image: "static/Possibilities.webp",
  },
  {
    title: "PIONEERING",
    description: "Explore and develop cutting-edge use-cases that push the boundaries of what's imaginable, such as AI-driven personalized learning environments and computer vision for inventory management.",
    image: "static/pioneering.webp",
  },
];

// Main Component
export default function About() {
  return (
    <div className="bg-gray-100 py-16 px-8 sm:px-10 lg:px-12" style={{ fontFamily: 'inherit' }}>
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-gray-800 font-bold mb-4 text-4xl sm:text-3xl md:text-4xl lg:text-6xl">
            Unlocking <span className="text-orange-500">AI's</span> Potential with the 3Ps
          </h2>
          <div className="w-32 mx-auto h-2 bg-orange-500 rounded-full"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-8 px-4 sm:px-8 lg:px-12">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

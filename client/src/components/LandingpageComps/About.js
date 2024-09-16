import React, { useState } from "react";

// Card Component
function Card({ title, description, image }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out"
      style={{ height: '230px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image}
        alt={title}
        className="object-cover w-full h-full transition-transform duration-300"
        style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p
          className={`text-sm transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
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
    description: "Harnessing GenAI's power, we revolutionise your organisation's productivity at individual, team, and enterprise levels.",
    image: "static/Productivity.webp",
  },
  {
    title: "POSSIBILITIES",
    description: "Leverage GenAI to achieve what was once unthinkable in technology and business, unlocking unprecedented growth.",
    image: "static/Possibilities.webp",
  },
  {
    title: "PIONEERING",
    description: "Turn today's pioneering concepts into your competitive advantages, ensuring your organisation stays ahead.",
    image: "static/pioneering.webp",
  },
];

// Main Component
export default function BlockchainUpdates() {
  return (
    <div className="bg-gray-100 py-16 px-8" style={{ fontFamily: 'inherit' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-gray-800 font-bold mb-4 text-3xl sm:text-4xl lg:text-5xl">
            Unlocking AI's Potential with the 3Ps
          </h2>
          <div className="w-32 mx-auto h-1 bg-orange-500"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

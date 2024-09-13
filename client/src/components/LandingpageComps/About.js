import React, { useState } from "react";

// Card Component
function Card({ title, description, image }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white bg-opacity-90 backdrop-blur-md border border-gray-200 rounded-lg flex h-[150px] w-[1000px] overflow-hidden transition-transform duration-300 ease-in-out ${
        isHovered ? "scale-105 shadow-2xl" : "scale-100 shadow-lg"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image section */}
      <div className="w-1/3 h-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      {/* Content section */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
  <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
  <p className="text-sm text-gray-600 mt-0 mb-4">{description}</p>
</div>



    </div>
  );
}

// Data for the cards
const cards = [
  {
    title: "PRODUCTIVITY",
    description:
      "Harnessing GenAI's power, we revolutionise your organisation's productivity at individual, team, and enterprise levels. Our solutions streamline existing processes and software, accelerating development cycles and optimising business operations through AI-driven automation.",
    image: "static/S4.png",
  },
  {
    title: "POSSIBILITIES",
    description:
      "Leverage GenAI to achieve what was once unthinkable in technology and business. Through strategic investment in emerging possibilities, we empower organisations to unlock unprecedented growth and redefine industry standards.",
    image: "static/Possibilities.webp",
  },
  {
    title: "PIONEERING",
    description:
      "Turn today's pioneering concepts into your competitive advantages, ensuring your organisation always stays ahead of the curve. At the forefront of GenAI innovation, we'll help your organisation explore and develop use-cases that challenge conventional limits and reshape your industry.",
    image: "static/pioneering.webp",
  },
];

// Main Component
export default function BlockchainUpdates() {
  return (
    <div className="bg-gray-100 py-16 px-8 sm:px-10 lg:px-12" style={{ fontFamily: 'inherit' }}>
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-gray-800 font-bold mb-4 text-xs sm:text-base md:text-2xl lg:text-5xl">
            Unlocking AI's Potential with the 3Ps
          </h2>
          <div className="w-32 mx-auto h-2 bg-orange-500"></div>
        </div>
        <div className="flex justify-center gap-12 px-4 sm:px-8 lg:px-12">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

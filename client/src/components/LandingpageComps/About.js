import React, { useState } from "react";

const cards = [
  {
    title: "PRODUCTIVITY",
    description:
      "Explore the latest changes in our blockchain system! Stay informed about the latest developments.",
    image: "static/S4.png",
  },
  {
    title: "POSSIBILITIES",
    description:
      "Security is paramount in the blockchain world, and new protocols aim to strengthen this foundation.",
    image: "static/s2.jpeg",
  },
  {
    title: "PIONEERING",
    description:
      "Guide through the fundamentals of blockchain that will help you embark on exploring the world of this fascinating technology.",
    image: "static/s1.avif",
  },
];

function Card({ title, description, image }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white bg-opacity-90 backdrop-blur-md border border-gray-200 rounded-lg p-6 flex flex-col h-[340px] w-[320px] relative overflow-hidden transition-transform duration-300 ease-in-out transform ${
        isHovered ? "scale-105 shadow-2xl rotate-1" : "scale-100 shadow-lg rotate-0"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image section */}
      <div className="relative w-full h-1/2 overflow-hidden mb-4">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 object-cover w-full h-full"
          style={{ objectFit: 'cover', border: 'none' }} // Ensure no border
        />
      </div>

      {/* Content section */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        {/* Removed the icon */}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 relative z-10">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 flex-grow relative z-10">{description}</p>
    </div>
  );
}

export default function BlockchainUpdates() {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Unlocking AI's Potential with the 3Ps
          </h2>
          <div className="w-32 mx-auto h-1 bg-orange-500"></div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch space-y-8 md:space-y-0 md:space-x-6">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

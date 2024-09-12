import React, { useState } from "react";

// Card Component
function Card({ title, description, image }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white bg-opacity-90 backdrop-blur-md border border-gray-200 rounded-lg flex h-[125px] w-[1000px] overflow-hidden transition-transform duration-300 ease-in-out ${
        isHovered ? "scale-105 shadow-2xl rotate-1" : "scale-100 shadow-lg rotate-0"
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
          style={{ border: 'none' }} // Ensure no border
        />
      </div>
      {/* Content section */}
      <div className="w-2/3 p-6 flex flex-col justify-between">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

// Data for the cards
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

// Main Component
export default function BlockchainUpdates() {
  return (
    <div className="bg-gray-50 py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-black font-bold mb-4 text-xs sm:text-base md:text-2xl lg:text-5xl">
            Unlocking AI's Potential with the 3Ps
          </h2>
          <div className="w-32 mx-auto h-2 bg-orange-500"></div>
        </div>
        <div className="flex justify-center gap-12">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

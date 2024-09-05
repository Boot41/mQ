import React from "react";
import { Link } from "react-router-dom";
import { heroSectionData } from "../../InformationFiles/CareersInfo"; // Adjust the path as needed

const HeroSection = () => {
  return (
    <div
      className="flex items-center justify-center h-[400px] bg-cover bg-center"
      style={{ backgroundImage: `url(${heroSectionData.backgroundImage})` }}
    >
      <div className="text-center text-white px-4 bg-black bg-opacity-50 py-8 rounded-md">
        <h1 className="text-4xl font-bold mb-4">
          {heroSectionData.title}{" "}
          <span className="text-orange-400">
            {heroSectionData.highlightText}
          </span>
        </h1>
        <p className="mb-6">{heroSectionData.description}</p>
        <div className="flex justify-center space-x-4">
          {heroSectionData.buttons.map((button, index) => (
            <Link key={index} to={button.link}>
              <button className={button.buttonClass}>{button.text}</button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

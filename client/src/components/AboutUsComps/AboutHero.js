import React from "react";
import { useSection } from "../TrackUserComps/SectionContext";
const AboutHero = () => {
  //  const { currentSection } = useSection();
  //  console.log("this is About Us section");
  return (
    <div className="text-black font-sans">
      <div className="max-w-6xl mx-auto py-16 px-8">
        <h1 className="text-5xl font-bold mb-4">
          Designing Futures,
          <br />
          Crafting Experiences
        </h1>
        <p className="text-lg mb-8">
          We blend creativity and innovation to craft immersive designs that
          redefine experiences. From web interfaces to product aesthetics.
        </p>
        <button className="flex items-center bg-white border-2 border-black px-4 py-2 rounded-full">
          <span className="mr-2">Let's Talk</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.25 9l-4.5 4.5m0 0l4.5 4.5m-4.5-4.5H3.75m9 0a9 9 0 11-9-9 9 9 0 019 9z"
            />
          </svg>
        </button>
      </div>
      <div className="w-full h-[300px] overflow-hidden mb-16">
        <img
          src="about1hero.jpeg"
          alt="Team working together"
          className="w-full object-cover"
        />
      </div>
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-2xl font-bold mb-2">About Us</h2>
        <p className="text-lg">
          Welcome to Asigncy, where creative innovation. Our agency is a team of
          passionate designers to crafting digital experiences.
        </p>
      </div>
    </div>
  );
};

export default AboutHero;

import React from "react";
import { pressSectionData } from "../../InformationFiles/LandingPageInfo";

const PressSection = () => {
  return (
    <section className="px-6 py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {pressSectionData.title}
          </h1>
          <a
            href={pressSectionData.seeAllLink}
            className="bg-gray text-sm text-gray-600 hover:underline"
          >
            SEE ALL
          </a>
        </div>

        <div className="flex space-x-4">
          {pressSectionData.cards.map((card, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md overflow-hidden flex flex-col w-full max-w-50"
            >
              <img
                src={card.imgSrc}
                alt={card.imgAlt}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {card.title}
                </h2>
                <p className="text-gray-700 mb-4">{card.description}</p>
                <a
                  className="text-blue-600 hover:underline mt-auto"
                  href={card.readMoreLink}
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressSection;

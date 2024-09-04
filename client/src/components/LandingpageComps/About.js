import React from "react";
import { CVPData } from "../../InformationFiles/LandingPageInfo";

const About = () => {
  return (
    <div className=" rounded-t-3xl ">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center py-20 w-full">
          {CVPData.map((service, index) => (
            <div key={index} className="w-1/4 px-4 mb-8 flex-shrink-0 ">
              <div className="flex flex-col items-center">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-20 h-20 mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold mb-2 text-center text-black">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center text-base">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;

import React from "react";
import { CVPData } from "../../InformationFiles/LandingPageInfo";
import { Typography } from "@mui/material";

const About = () => {
  return (
    <div className="py-10 rounded-t-3xl">
      <h1 className="text-center text-6xl text-orange-400 font-bold"></h1>
      <Typography
            variant="h3"
            component="h3"
            color="orange"
            fontWeight="bold"
            fontFamily="Baskervville SC, serif"
            gutterBottom
            sx={{ 
                fontSize: { xs: "2rem", md: "3rem", lg: "4rem" },
                textAlign: 'center' // {{ edit_1 }} Centering the text
            }}
            className="text-center" // {{ edit_1 }} Centering the text for all screen sizes
      >
        Unlocking AI's Potential With The 3P's
      </Typography>
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="flex overflow-x-auto gap-8 py-4 scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {CVPData.map((service, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-24 h-24 mb-4 object-cover rounded-full border-2 border-orange-400"
                />
                <h3 className="text-lg font-semibold mb-2 text-center text-black">
                  {service.title}
                </h3>
                <p className="text-gray-700 text-center text-base">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

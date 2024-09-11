import React from 'react';
import { Button } from '@mui/material';

const AboutHero = () => {
  const handleLearnMore = () => {
    console.log('Learn More clicked');
  };

  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url("static/r5.png")' }}
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10" />
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 lg:mb-8 leading-tight">
          Leading with Passion and Purpose
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 lg:mb-10">
          Discover our journey of innovation and impact.
        </p>
        <Button
          onClick={handleLearnMore}
          variant="outlined"
          color="warning"
          sx={{
            position: "relative",
            overflow: "hidden",
            borderColor: "black",
            backgroundColor: "black",
            color: "white",
            px: { xs: 2, sm: 4 },
            py: { xs: 1, sm: 2 },
            fontSize: { xs: '14px', sm: '16px' },
            "&:hover": {
              color: "white",
              backgroundColor: "transparent",
            },
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              backgroundColor: "orange",
              transition: "left 0.5s ease",
              zIndex: -1,
            },
            "&:hover::before": {
              left: 0,
            },
          }}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default AboutHero;

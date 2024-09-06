import React from 'react';
import { Button } from '@mui/material';

const AboutHero = () => {
  const handleClick = (buttonName) => {
    console.log(`${buttonName} clicked`);
  };

  return (
    <div
      className="relative text-white h-[40vh] flex items-center justify-center"
      style={{ backgroundImage: 'url("r5.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl font-extrabold mb-4">Leading with passion and purpose</h1>
        <p className="text-lg font-semibold mb-6">
          Discover our journey of innovation and impact.
        </p>
        <Button
          onClick={() => handleClick("Button1")}
          variant="outlined"
          color="warning"
          sx={{
            position: "relative",
            overflow: "hidden",
            borderColor: "black",
            backgroundColor: "black",
            color: "white",
            px: 4,
            py: 2,
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
              border: "white",
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

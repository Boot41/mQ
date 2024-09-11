import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'; // Import MUI Button component

const HeroSection = () => {
  const handleClick = (buttonName) => {
    // Implement the click handler logic here
    console.log(`${buttonName} clicked`);
  };

  return (
    <div 
      className="flex items-center justify-center h-[450px] bg-cover bg-center" 
      style={{ backgroundImage: 'url(static/careershero.webp)' }}
    >
      <div 
        className="bg-black bg-opacity-50 px-8 py-10 rounded-lg max-w-4xl mx-auto text-center"
      >
        <h1 className="text-5xl font-bold mb-4 text-white">
          Be the force behind impactful <br></br><span className="text-orange-400">AI advancements</span>
        </h1>
        <p className="mb-8 text-lg text-white">
          We are a bunch of tech enthusiasts and dreamers who want to turn AI possibilities into reality. Founded by seasoned entrepreneurs, we offer a culture of inclusivity, balance, and a flat structure where your career growth is in your hands.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/openpositions">
            <Button
              onClick={() => handleClick("Open Positions")}
              variant="outlined"
              color="warning"
              sx={{
                position: "relative",
                overflow: "hidden",
                borderColor: "black",
                backgroundColor: "black",
                color: "white",
                fontSize: { xs: "16px", lg: "14px" },
                px: { xs: 3, lg: 2 },
                py: { xs: 1.5, lg: 2 },
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
              Open Positions
            </Button>
          </Link>
          <Link to="/contact">
            <Button
              onClick={() => handleClick("Contact Us")}
              variant="outlined"
              color="warning"
              sx={{
                position: "relative",
                overflow: "hidden",
                borderColor: "black",
                backgroundColor: "black",
                color: "white",
                fontSize: { xs: "16px", lg: "14px" },
                px: { xs: 3, lg: 2 },
                py: { xs: 1.5, lg: 2 },
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
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

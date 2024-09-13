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
      className="flex items-center justify-center h-[450px] bg-cover bg-center relative" 
      style={{ backgroundImage: 'url(static/careersheropage.webp)' }}
    >
      <div 
        className="bg-black bg-opacity-50 px-4 py-8 rounded-lg max-w-4xl mx-auto text-center relative"
        style={{ zIndex: 1 }} // Ensure the text is above the background
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Be the force behind impactful <br /> <span className="text-orange-400">AI advancements</span>
        </h1>
        <p className="text-base md:text-lg mb-8 text-white">
          Join us in transforming innovative ideas into real AI advancements. At Think41, we're a team of tech enthusiasts and dreamers committed to making a difference. Founded by seasoned entrepreneurs, we foster a culture of inclusivity, flexibility, and personal growth. Be a part of shaping the future of AI and make an impact with us.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/openpositions">
            <Button
              onClick={() => handleClick("Open Positions")}
              variant="outlined"
              color="warning"
              sx={{
                position: "relative",
                overflow: "hidden",
                borderColor: "orange",
                backgroundColor: "#f57c00", // Updated color
                color: "white",
                fontSize: { xs: "16px", lg: "12px" }, // Adjusted font size
                px: { xs: 3, lg: 2 }, // Adjusted padding
                py: { xs: 0, lg: 1 }, // Removed top padding for small screens
                borderRadius: 0, // Updated border radius
                fontWeight: "bold", // Updated font weight
                textTransform: "uppercase", // Updated text transform
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
          
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

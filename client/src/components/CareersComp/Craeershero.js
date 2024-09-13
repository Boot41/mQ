import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'; // Import MUI Button component
import LazyLoad from 'react-lazyload';

const HeroSection = () => {
  const handleClick = (buttonName) => {
    // Implement the click handler logic here
    console.log(`${buttonName} clicked`);
  };
  
  return (
    <LazyLoad height={450} once>
      <div 
        className="flex items-center justify-center h-[450px] bg-cover bg-center" 
        style={{ backgroundImage: 'url(static/careershero.webp)' }}
      >
        <div 
          className="bg-black bg-opacity-50 px-4 py-8 rounded-lg max-w-4xl mx-auto text-center"
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
                  borderColor: "black",
                  backgroundColor: "black",
                  color: "white",
                  fontSize: { xs: "14px", sm: "16px" },
                  px: { xs: 2, sm: 3 },
                  py: { xs: 1.5, sm: 2 },
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
                  fontSize: { xs: "14px", sm: "16px" },
                  px: { xs: 2, sm: 3 },
                  py: { xs: 1.5, sm: 2 },
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
    </LazyLoad>
  );
};

export default HeroSection;

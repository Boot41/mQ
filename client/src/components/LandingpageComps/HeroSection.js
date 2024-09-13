import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import Typical from "react-typical";
import { typicalConfig } from "../../InformationFiles/LandingPageInfo";
import { FaArrowRight } from 'react-icons/fa';
import LazyLoad from 'react-lazyload';

function HeroSection2() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = 'static/hero1.jpeg';
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <LazyLoad height={'calc(100vh - 300px)'} once>
      <Box
        sx={{
          height: { xs: "auto", lg: "calc(100vh - 300px)" },
          backgroundImage: imageLoaded ? `url('static/hero1.jpeg')` : 'none',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          overflow: "hidden",
          padding: 0,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          color: "white",
          transition: "background-image 0.3s ease-in",
        }}
      >
        {/* Black tint overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Black tint with 70% opacity
            zIndex: 0,
          }}
        />

        {/* Left section - Text and Buttons */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: { xs: "100%", lg: "50%" },
            p: { xs: 4, lg: 8 },
            textAlign: { xs: "center", lg: "left" },
          }}
        >
          <div className="flex flex-col items-center lg:items-start">
            <Typography
              variant="h3"
              component="h3"
              color="white"
              fontWeight="bold"
              fontFamily="Baskervville SC, serif"
              gutterBottom
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "4rem" },
                lineHeight: "1.2",
                maxWidth: "100%",
                height: { xs: "4rem", sm: "5rem", md: "6rem", lg: "20rem" },
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#f57c00" }}>
                <Typical
                  steps={typicalConfig.steps}
                  loop={Infinity}
                  wrapper="span"
                />
              </span>
            </Typography>

            <Typography
              variant="h6"
              component="h6"
              color="#c0c0c0" // Light gray color
              fontWeight="medium"
              sx={{
                fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem", lg: "1.7rem" },
                mb: 4,
              }}
            >
              Crafting intelligent software to solve your unique challenges.
            </Typography>

            <Box className="flex justify-center lg:justify-start">
              <Link to="/visualizingai">
                <Button
                  variant="outlined"
                  color="warning"
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderColor: "black",
                    backgroundColor: "#f57c00",
                    color: "white",
                    fontSize: { xs: "16px", lg: "12px" },
                    px: { xs: 3, lg: 2 },
                    py: { xs: 1, lg: 1 },
                    borderRadius: 0,
                    fontWeight: "bold",
                    textTransform: "uppercase",
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
                  Visualizing AI
                  <FaArrowRight style={{ marginLeft: '8px' }} />
                </Button>
              </Link>
            </Box>
          </div>
        </Box>
      </Box>
    </LazyLoad>
  );
}

export default HeroSection2;

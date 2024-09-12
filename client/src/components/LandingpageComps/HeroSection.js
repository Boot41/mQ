import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import Typical from "react-typical";
import { typicalConfig } from "../../InformationFiles/LandingPageInfo";

function HeroSection2() {
  return (
    <Box
      className="relative flex flex-col lg:flex-row items-center justify-between text-left text-white overflow-hidden "
      sx={{
        height: { xs: "auto", lg: "calc(100vh - 300px)" },
        backdropBlur: "md",
        backgroundImage: `url('static/hero1.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        overflow: "hidden",
        padding: 0, // Ensure no padding
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
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Black tint with 70% opacity
          zIndex: -1,
        }}
      />

      {/* Left section - Text and Buttons */}
      <Box className="w-1/2 lg:w-1/2 p-6 lg:p-24 lg:ml-10">
        <div className="flex flex-col lg:justify-start lg:items-start justify-center items-center">
          <Typography
            variant="h3"
            component="h3"
            color="black"
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
            <span style={{ color: "orange" }}>
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
            color="gray"
            fontWeight="medium"
            sx={{
              fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem", lg: "2.2rem" },
              mb: 4,
            }}
          >
            Crafting intelligent software to solve your unique challenges.
          </Typography>

          <Box className="flex justify-start space-x-4">
            <Link to="/visualizingai">
              <Button
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
                    border: "white",
                  },
                  "&:hover::before": {
                    left: 0,
                  },
                }}
              >
                Visualizing AI
              </Button>
            </Link>
            <Button
              variant="outlined"
              color="warning"
              sx={{
                position: "relative",
                overflow: "hidden",
                borderColor: "black",
                backgroundColor: "white",
                fontSize: { xs: "16px", lg: "14px" },
                color: "black",
                px: { xs: 3, lg: 2 },
                py: { xs: 1.5, lg: 0 },
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
              Get in Touch
            </Button>
          </Box>
        </div>
      </Box>
    </Box>
  );
}

export default HeroSection2;

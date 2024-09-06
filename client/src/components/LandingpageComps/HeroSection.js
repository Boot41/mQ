import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import Typical from "react-typical";
import { typicalConfig } from "../../InformationFiles/LandingPageInfo";

function HeroSection2() {
  return (
    <Box
      className="relative flex flex-col lg:flex-row items-center justify-between text-left text-white overflow-hidden mt-24 mx-4 lg:mx-10 md:flex-col  md:"
      sx={{
        height: { xs: "auto", lg: "calc(100vh - 300px)" },
        backdropBlur: "md",
      }}
    >
      {/* Left section - Text and Buttons */}
      <Box className="w-full lg:w-1/2 p-6 lg:p-24 lg:ml-10">
        <div className="flex flex-col lg:justify-start lg:items-start justify-center items-center">
          <Typography
            variant="h3"
            component="h3"
            color="black"
            fontWeight="bold"
            fontFamily="Baskervville SC, serif"
            gutterBottom
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "4rem" }, // Adjusted for smaller screens
              lineHeight: "1.2", // Consistent line spacing
              maxWidth: "100%", // Ensure full-width usage
              height: { xs: "4rem", sm: "5rem", md: "6rem", lg: "20rem" }, // Fixed height for different screen sizes
              overflow: "hidden", // Prevent content overflow
              display: "flex", // Flex display for centering
              alignItems: "center", // Vertically center text
              justifyContent: "center", // Horizontally center text
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
                  px: { xs: 3, lg: 4 },
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
                color: "black",
                px: { xs: 3, lg: 4 },
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
              Get in Touch
            </Button>
          </Box>
        </div>
      </Box>

      {/* Right section - Spline Model */}
      <Box className="w-full lg:w-1/2 lg:p-24 lg:mr-10 relative h-64 sm:h-80 md:h-96 lg:h-full flex justify-center">
        <iframe
          src="https://my.spline.design/nexbotrobotcharacterconcept-daa066f84acfc7f95db37781feb78e68/"
          frameBorder="0"
          width="100%"
          height="100%"
          title="Spline Model"
        ></iframe>
      </Box>
    </Box>
  );
}

export default HeroSection2;

import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import Typical from "react-typical";
import { typicalConfig } from "../../InformationFiles/LandingPageInfo";
import { useSection } from "../TrackUserComps/SectionContext";
function HeroSection2() {
  const { currentSection } = useSection();
  // console.log("this is hero section" + currentSection);
  return (
    <Box className="relative h-[calc(100vh-300px)] backdrop:blur-md flex items-center justify-between text-left text-white overflow-hidden mt-24 backdrop-blur-lg  mx-10">
      {/* Content */}
      {/* <h1>{currentSection}</h1> */}
      <Box className="w-1/2 p-24 ml-10">
        <Typography
          variant="h3"
          component="h3"
          color="black" // Static part color
          fontWeight="bold"
          fontFamily="Baskervville SC, serif"
          gutterBottom
          sx={{ fontSize: { xs: "3rem", md: "3rem", lg: "4rem" } }}
        >
          <span>
            Envision{" "}
            <span style={{ color: "orange" }}>
              <Typical
                steps={typicalConfig.steps}
                loop={Infinity}
                wrapper="span"
              />
            </span>
          </span>
        </Typography>

        <Typography
          variant="h6"
          component="h6"
          color="gray"
          fontWeight="medium"
          sx={{ fontSize: { xs: "1.5rem", md: "2rem", lg: "2.2rem" }, mb: 6 }}
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
              },
              "&:hover::before": {
                left: 0,
              },
            }}
          >
            Get in Touch
          </Button>
        </Box>
      </Box>

      {/* Embed Spline Model */}
      <Box className="w-1/2 p-24 mr-10 relative h-full flex flex-col  justify-center">
        <iframe
          // src="https://my.spline.design/aibrain-a71e09638671f4b244109925f3f00639/"
          src="https://my.spline.design/nexbotrobotcharacterconcept-daa066f84acfc7f95db37781feb78e68/"
          frameBorder="0"
          width="100%"
          height="100%"
          className=""
          title="Spline Model"
          style={{ zIndex: 1 }}
        ></iframe>
        {/* <img src={humanrobo} /> */}
      </Box>
    </Box>
  );
}

export default HeroSection2;

import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { AutoPodsData } from "../../InformationFiles/LandingPageInfo";
import axios from "axios";
import { API_BASE_URL } from '../config';

const Autopods = () => {
  const handleClick = async () => {
    try {
      const response = await axios.post(
        "${API_BASE_URL}/api/website-interaction/",
        {
          user_input:
            "I'd like to know more about Think41's Autopods. Can you provide detailed information about what Autopods are, how they work, their benefits, and how they integrate Gen AI agents? Also, how do Autopods enhance the software development process and what makes them unique compared to traditional development teams?",
          model_name: "4o-mini",
          section_id: "autopods-section",
          user_context: {},
        }
      );

      // Handle the response as needed
      console.log("API Response:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error making API call:", error);
    }
  };

  return (
    <div className="py-10 mb-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Video Section */}

          <div className="w-full md:w-1/2 flex justify-center">
            <video
              src={AutoPodsData.videoSrc}
              autoPlay
              loop
              muted
              className="w-full h-auto max-w-md rounded-lg"
            ></video>
          </div>

          {/* Text Section */}
          <Box className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
            <Typography
              variant="h3"
              component="h3"
              color="orange"
              fontWeight="bold"
              fontFamily="Baskervville SC, serif"
              gutterBottom
              sx={{ fontSize: { xs: "2rem", md: "3rem", lg: "4rem" } }}
              className="text-center md:text-left"
            >
              {AutoPodsData.title}
            </Typography>
            <Typography
              variant="h6"
              component="h6"
              color="gray"
              fontWeight="medium"
              sx={{
                fontSize: { xs: "1.2rem", md: "1.5rem", lg: "1.7rem" },
                mb: 2,
              }}
              className="text-center md:text-left"
            >
              {AutoPodsData.subtitle1}
            </Typography>
            <Typography
              variant="h6"
              component="h6"
              color="gray"
              fontWeight="medium"
              sx={{
                fontSize: { xs: "1.2rem", md: "1.5rem", lg: "1.7rem" },
                mb: 2,
              }}
              className="text-center md:text-left"
            >
              {AutoPodsData.subtitle2}
            </Typography>
            <Typography
              variant="h6"
              component="h6"
              color="gray"
              fontWeight="medium"
              sx={{
                fontSize: { xs: "1rem", md: "1.2rem", lg: "1.5rem" },
                mb: 4,
              }}
              className="text-center md:text-left"
            >
              {AutoPodsData.description}
            </Typography>
            <Box className="flex justify-center md:justify-start">
              <Link to="#">
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
                    // fontSize: { xs: "16px", lg: "12px" },
                    // px: 4,
                    // py: 2,
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
                  {AutoPodsData.buttonText}
                </Button>
              </Link>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Autopods;

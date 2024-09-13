import React, { useCallback, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { AutoPodsData } from "../../InformationFiles/LandingPageInfo";

import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import LazyLoad from 'react-lazyload';

import {API_BASE_URL} from '../../lib/config';


import { useChat } from '../../context/ChatContext';
import { speakText } from '../../utils/speechUtils';
import axios from "axios";
import { API_BASE_URL } from '../../lib/config';

const Autopods = ({ onMessageAdd = () => {} }) => {
  const { addMessage, toggleChat } = useChat();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleMessageAdd = (newMessage) => {
    addMessage(newMessage);>>>>>>> main
    toggleChat();
  };

  const handleClick = async () => {
    // ... (keep the existing handleClick logic)
  };

  const speakTextWrapper = useCallback((text) => {
    speakText(text, true, setIsSpeaking, () => {}, () => {});
  }, [setIsSpeaking]);

  return (

    <Box className="py-16 px-4 md:px-8 lg:px-16 xl:px-24">
      <Box className="container mx-auto">
        <Box className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Image Section */}
          <Box className="w-full md:w-1/2 flex justify-center">
            <div className="w-full md:w-1/2 flex justify-center px-24">{/* Adjusted padding */}
          <LazyLoad height={400} once>
            <img
              src="static/autopods.webp"
              alt="AutoPods illustration"
              className="w-full max-w-[500px] h-auto max-h-[400px] rounded-lg"
            />
          </LazyLoad>
        </div>   

        {/* Text Section */}
        <Box className="w-full md:w-1/2 flex flex-col justify-center space-y-6 px-10"> {/* Adjusted padding */}
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
              fontSize: { xs: "1.2rem", md: "1.5rem", lg: "1.5rem" },
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
              fontSize: { xs: "1.2rem", md: "1.5rem", lg: "1rem" },
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
              fontSize: { xs: "1rem", md: "1.2rem", lg: "1rem" },
              mb: 4,
            }}
            className="text-center md:text-left"
          >
            {AutoPodsData.description}
          </Typography>
          <Box className="flex justify-center md:justify-start">
            <Link to="#">
              <Button
                onClick={handleClick}
                variant="outlined"
                color="warning"
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  borderColor: "black",
                  backgroundColor: "black",
                  color: "white",
                  fontSize: { xs: "14px", lg: "9px" },
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

          {/* Text Section */}
          <Box className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
  <Typography
    variant="h2"
    component="h2"
    color="#f57c00"
    fontWeight="bold"
    sx={{ 
      fontSize: { xs: "2.5rem", md: "3rem", lg: "3.5rem" },
      fontFamily: 'inherit',
    }}
  >
    {AutoPodsData.title}
  </Typography>
  <Typography
    variant="h4"
    component="h4"
    color="textSecondary"
    sx={{
      fontSize: { xs: "1.5rem", md: "1.75rem", lg: "2rem" },
      fontFamily: 'inherit',
    }}
  >
    {AutoPodsData.subtitle1}
  </Typography>
  <Typography
    variant="h6"
    component="h6"
    color="textSecondary"
    sx={{
      fontSize: { xs: "1.1rem", md: "1.2rem", lg: "1.3rem" },
      fontFamily: 'inherit',
    }}
  >
    {AutoPodsData.subtitle2}
  </Typography>
  <Typography
    variant="body1"
    color="textSecondary"
    sx={{
      fontSize: { xs: "1rem", md: "1.1rem", lg: "1.5rem" },
      fontFamily: 'inherit',
    }}
  >
    {AutoPodsData.description}
  </Typography>
  <Typography
    variant="body1"
    color="textSecondary"
    sx={{
      fontSize: { xs: "1rem", md: "1.1rem", lg: "1.5rem" },
      fontFamily: 'inherit',
    }}
  >
    {AutoPodsData.additionalParagraph}
  </Typography>
  <Box className="mt-6">
    <Link to="#" style={{ textDecoration: 'none' }}>
      <Button
        onClick={handleClick}
        variant="outlined"
        color="warning"
        sx={{
          position: "relative",
          overflow: "hidden",
          borderColor: "orange",
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
        Know More
        <FaArrowRight style={{ marginLeft: '8px' }} />
      </Button>
    </Link>
  </Box>
</Box>

        </Box>
      </Box>
    </Box>
  );
};

export default Autopods;
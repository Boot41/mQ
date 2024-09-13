import React, { useCallback, useState} from "react";
import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { AutoPodsData } from "../../InformationFiles/LandingPageInfo";
import axios from "axios";
import LazyLoad from 'react-lazyload';

import {API_BASE_URL} from '../../lib/config';

import { useChat } from '../../context/ChatContext';
import { speakText } from '../../utils/speechUtils';

const Autopods = ({ onMessageAdd = () => {} }) => {
  const { addMessage, toggleChat } = useChat();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleMessageAdd = (newMessage) => {
    addMessage(newMessage);
    toggleChat();
  };


  const handleClick = async () => {
    const userMessage = "Tell me more about Think41's Autopods";
    
    try {
      handleMessageAdd({
        type: "user",
        content: userMessage,
      });

      if (typeof onMessageAdd === 'function') {
        onMessageAdd({
          type: "user",
          content: userMessage,
        });
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/website-interaction/`,
        {
          user_input: `The user has clicked 'Know More' about Autopods on our landing page. Based on the information provided in the Autopods section, please elaborate on the following:
1. What are Autopods and how do they work?
2. How do Autopods integrate Gen AI agents into the software development process?
3. What are the key benefits of using Autopods?
4. How do Autopods enhance productivity and efficiency in software development?
5. What makes Autopods unique compared to traditional development teams?
Please provide a comprehensive yet concise response that a potential client would find informative and engaging.`,
          model_name: "4o-mini",
          section_id: "autopods-section",
          user_context: {
            section: "Autopods",
            user_action: "Clicked 'Know More' button",
            displayed_info: {
              title: AutoPodsData.title,
              subtitle1: AutoPodsData.subtitle1,
              subtitle2: AutoPodsData.subtitle2,
              description: AutoPodsData.description,
            },
          },
        }
      );

      const assistantMessage = { type: "assistant", content: response.data.response };
      handleMessageAdd(assistantMessage);
      speakTextWrapper(response.data.response);

      if (typeof onMessageAdd === 'function') {
        onMessageAdd(assistantMessage);
      }

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error making API call:", error);
      const errorMessage = {
        type: "assistant",
        content: "I apologize, but I encountered an error while fetching information about Autopods. Please try again or contact our support team for assistance.",
      };
      handleMessageAdd(errorMessage);
      if (typeof onMessageAdd === 'function') {
        onMessageAdd(errorMessage);
      }
    }
  };

  const speakTextWrapper = useCallback((text) => {
    speakText(text, true, setIsSpeaking, () => {}, () => {});
  }, [setIsSpeaking]);

  return (
    <div className="py-16 px-32 md:px-24 lg:px-32 xl:px-40 mb-16">  {/* Increased side padding */}
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-center gap-0"> {/* Removed gap */}
        {/* Image Section */}
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
        </Box>
      </div>
    </div>
  </div>


  );
};

export default Autopods;

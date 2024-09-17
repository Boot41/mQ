import React, { useCallback, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { AutoPodsData } from "../../InformationFiles/LandingPageInfo";
import axios from "axios";
import LazyLoad from 'react-lazyload';
import { API_BASE_URL } from '../../lib/config';
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
    <Box
      sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, // Column on small screens, row on medium and up
        height: { xs: 'auto', md: '45vh' }, // Auto height on small screens
        overflow: 'hidden' 
      }}
    >
      {/* Left side - Image */}
      <Box
        sx={{
          flex: { xs: 'none', md: 2 / 3 }, // Full width on small screens, 2/3 on medium and up
          position: 'relative',
          width: '100%',
          height: { xs: 'auto', md: '100%' }, // Auto height on small screens
        }}
      >
        <LazyLoad height={450} once>
          <img
            src="static/autopods.webp"
            alt="AutoPods illustration"
            style={{ 
              width: '100%', 
              height: '100%',  // Set height to 100% to fit within the section
              objectFit: 'contain' // Adjusted to fit the image within the section
            }}
          />
        </LazyLoad>
      </Box>

      {/* Right side - Content */}
      <Box
        sx={{ 
          flex: { xs: 'none', md: 1 / 3 }, // Full width on small screens, 1/3 on medium and up
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          p: 2, // Reduced padding on small screens
          bgcolor: 'grey.200', // Light gray background
          textAlign: { xs: 'left', md: 'left' } // Center text on small screens
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ 
            fontFamily: 'inherit',
            fontSize: { xs: '24px', md: '30px' }, // Responsive font size
            fontWeight: 600,
            lineHeight: { xs: '32px', md: '42.56px' },
            textAlign: 'left', // Center text on small screens
          }}
          gutterBottom
        >
          <span>Auto</span>
          <span style={{ color: '#f57c00' }}>PODS</span>
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: 'inherit',
            fontSize: { xs: '14px', md: '16px' }, // Responsive font size
            fontWeight: 400,
            lineHeight: { xs: '20px', md: '21.28px' },
            textAlign: 'left', // Center text on small screens
            color: 'text.secondary',
          }}
          gutterBottom
        >
          {AutoPodsData.subtitle1}
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            fontFamily: 'inherit',
            fontSize: { xs: '14px', md: '16px' }, // Responsive font size
            fontWeight: 400,
            lineHeight: { xs: '20px', md: '21.28px' },
            textAlign: 'left', // Center text on small screens
            color: 'text.secondary',
            mb: 2 // Reduced margin on small screens
          }}
        >
          {AutoPodsData.description}
        </Typography>
        <Box>
          <Button
            component={Link}
            to="#"
            onClick={handleClick}
            variant="outlined"
            sx={{
              borderColor: 'text.primary',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'text.primary',
                bgcolor: 'rgba(0, 0, 0, 0.04)'
              },
              mx: 'auto', // Center button on small screens
            }}
          >
            {AutoPodsData.buttonText}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Autopods;

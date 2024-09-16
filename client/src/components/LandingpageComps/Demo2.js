import React, { useState, useEffect, useCallback } from "react";
import { Typography, Button, Box } from "@mui/material";
import { DemoData } from "../../InformationFiles/LandingPageInfo";
import axios from "axios";
import { useChat } from '../../context/ChatContext';
import { speakText } from '../../utils/speechUtils';
import { API_BASE_URL } from '../../lib/config';
import { FaArrowRight } from 'react-icons/fa';

const Demo = ({ onMessageAdd = () => {} }) => {
  const { addMessage, toggleChat } = useChat();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleMessageAdd = (newMessage) => {
    addMessage(newMessage);
    toggleChat();
  };

  const handleSendMessage = async (newMessage) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/website-interaction/`,
        {
          user_input: newMessage,
          model_name: "4o-mini",
          section_id: "demo-section",
          user_context: {},
        }
      );

      const assistantResponse = response.data.response;
      addMessage({ type: 'assistant', content: assistantResponse });
      speakTextWrapper(assistantResponse);
      speakText(assistantResponse);
    } catch (error) {
      // ... error handling ...
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === DemoData.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = async () => {
    const currentDemo = DemoData[currentIndex];
    const userMessage = `Tell me more about ${currentDemo.name}`;
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
          user_input: `The user has clicked 'Know More' about ${currentDemo.name}. Please provide detailed information about this product, including its key features, benefits, and how it compares to similar products in the market. If you don't have specific information about ${currentDemo.name}, please provide general information about our demo products and their typical features. Also, suggest some questions the user might want to ask about this product.`,
          model_name: "4o-mini",
          section_id: "demo-section",
          user_context: {
            current_demo: currentDemo.name,
            demo_description: currentDemo.description,
            user_action: "Clicked 'Know More' button",
            user_intent: "Learn detailed information about the demo product",
          },
        }
      );

      const assistantMessage = { type: "assistant", content: response.data.response };
      handleMessageAdd(assistantMessage);
      speakTextWrapper(response.data.response);

      if (typeof onMessageAdd === 'function') {
        onMessageAdd(assistantMessage);
      }
    } catch (error) {
      console.error("Error making API call:", error);
      const errorMessage = {
        type: "assistant",
        content: "I apologize, but I encountered an error while fetching information about this demo. Please try again or contact our support team for assistance.",
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
    <>
      <header className="text-center my-5 sm:my-10 p-2 sm:p-4 md:p-10" style={{ fontFamily: 'inherit' }}>
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-extrabold text-gray-800 mb-2 sm:mb-4" style={{ fontFamily: 'inherit' }}>
          Check Out Some Demos
        </h1>
        <div className="w-16 sm:w-24 md:w-32 h-1 bg-orange-400 mx-auto mb-3 sm:mb-6"></div>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl text-gray-600" style={{ fontFamily: 'inherit' }}>
          Discover the features and capabilities of our latest demos and see how they can benefit you.
        </p>
      </header>

      <Box className="relative mx-auto h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-[95%] sm:w-[90%] max-w-[1000px]">
        <Box className="absolute inset-0 z-10 bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${DemoData[currentIndex].img}) ` }}
        >
          <Box className="w-full h-full flex items-center justify-center p-2 sm:p-4">
            <Box className="absolute inset-y-1/2 left-2 sm:left-4 transform -translate-y-1/2 sm:-translate-y-80 flex flex-col bg-opacity-50 p-2 sm:p-4 rounded-lg w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] max-w-xs md:max-w-md h-[200px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
              <Box className="text-center bg-opacity-50 p-2 sm:p-4 bg-transparent backdrop-blur-3xl border-2 sm:border-4 h-full" style={{ fontFamily: 'inherit' }}>
                <Typography
                  variant="h4"
                  className="text-orange-500 text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4 border-b-2"
                  style={{ fontFamily: 'inherit' }}
                >
                  {DemoData[currentIndex].name}
                </Typography>
                <Typography
                  variant="body1"
                  className="text-white text-xs sm:text-sm md:text-base leading-relaxed text-justify mb-3 sm:mb-6"
                  style={{ fontFamily: 'inherit' }}
                >
                  {DemoData[currentIndex].description}
                </Typography>
                <Button
  onClick={handleClick}
  variant="outlined"
  color="warning"
  sx={{
    position: "relative",
    overflow: "hidden",
    borderColor: "black",
    backgroundColor: "#f57c00",
    color: "white",
    fontSize: { xs: "8px", sm: "10px", md: "12px", lg: "14px" },
    px: { xs: 1, sm: 1.5, md: 2, lg: 2.5 }, // Adjust padding for smaller size
    py: { xs: 0.25, sm: 0.5, md: 0.75 }, // Adjust padding for smaller size
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
      backgroundColor: "#f57c00",
      transition: "left 0.5s ease",
      zIndex: -1,
    },
    "&:hover::before": {
      left: 0,
    },
  }}
>
  Know More
  <FaArrowRight style={{ marginLeft: '2px', fontSize: '0.8em' }} />
</Button>

              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Demo;
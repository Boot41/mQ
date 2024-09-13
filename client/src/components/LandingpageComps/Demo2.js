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
      <header className="text-center my-10 p-4 md:p-10" style={{ fontFamily: 'inherit' }}>
      <h1 className="text-6xl md:text-7xl lg:text-9xl font-extrabold text-gray-800 mb-4" style={{ fontFamily: 'inherit' }}>
  Check Out Some Demos
</h1>

        <div className="w-32 h-1 bg-orange-400 mx-auto mb-6"></div>
        <p className="mt-3 text-base md:text-3xl text-gray-600" style={{ fontFamily: 'inherit' }}>
          Discover the features and capabilities of our latest demos and see how
          they can benefit you.
        </p>
      </header>
      <Box className="relative mx-auto h-[300px] w-[1000px] md:h-[500px]">
        {/* Container for large background image */}
        <Box className="absolute inset-0 z-10 bg-cover bg-center transition-all duration-500 rounded-3xl lg:mx-20"
          style={{ backgroundImage: `url(${DemoData[currentIndex].img})` }}
        >
          <Box className="w-full h-full flex items-center justify-center p-4 md:p-6 mb:10">
            {/* Fixed-size box for text and button */}
            <Box className="absolute inset-y-1/2 left-4 transform -translate-y-80 hidden md:flex flex-col bg-opacity-50 p-4 md:p-6 rounded-lg w-full max-w-xs md:max-w-md h-[450px]">
              <Box className="text-center bg-opacity-50 p-4 bg-transparent backdrop-blur-3xl border-4 rounded-3xl h-full" style={{ fontFamily: 'inherit' }}>
                <Typography
                  variant="h2"
                  className="text-orange-500 text-3xl md:text-5xl font-bold mb-4 border-b-2"
                  style={{ fontFamily: 'inherit' }}
                >
                  {DemoData[currentIndex].name}
                </Typography>
                <Typography
                  variant="body1"
                  className="text-white text-sm md:text-base leading-relaxed text-justify mb-6"
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
                  <FaArrowRight style={{ marginLeft: '8px' }} />
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

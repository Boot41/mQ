import React, { useState, useEffect, useCallback } from "react";
import { Typography, Button, Box } from "@mui/material";
import { DemoData } from "../../InformationFiles/LandingPageInfo";
import axios from "axios";
import ChatConversation from "../chathistory/chatconversation";
import { useChat } from '../../context/ChatContext';
import { speakText } from '../../utils/speechUtils';

const Demo = ({ onMessageAdd = () => {} }) => {
  const { addMessage, toggleChat } = useChat();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleMessageAdd = (newMessage) => {
    addMessage(newMessage);
    toggleChat();
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  const handleSendMessage = async (newMessage) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/website-interaction/",
        // ... request body ...
      );

      const assistantResponse = response.data.response;
      addMessage({ type: 'assistant', content: assistantResponse });

      // Add this line to speak the response
      speakTextWrapper(assistantResponse);
      speakText(assistantResponse);

      // ... rest of the function ...
    } catch (error) {
      // ... error handling ...
    }
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === DemoData.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [DemoData.length]);

  const handleClick = async () => {
    const userMessage = `Tell me more about ${DemoData[currentIndex].name}`;
    try {
      // Add user message to local state
      handleMessageAdd({
        type: "user",
        content: userMessage,
      });

      // Only call onMessageAdd if it's a function
      if (typeof onMessageAdd === 'function') {
        onMessageAdd({
          type: "user",
          content: userMessage,
        });
      }

      const response = await axios.post(
        "http://localhost:8000/api/website-interaction/",
        {
          user_input: `Tell me about ${DemoData[currentIndex].name} if You Dont have information tell me what u have regarding demo section`,
          model_name: "4o-mini",
          section_id: "demo-section",
          user_context: {},
        }
      );

      // Add assistant message to local state
      const assistantMessage = { type: "assistant", content: response.data.response };
      handleMessageAdd(assistantMessage);

      // Add this line to speak the response
      speakText(response.data.response);

      // Only call onMessageAdd if it's a function
      if (typeof onMessageAdd === 'function') {
        onMessageAdd(assistantMessage);
      }

      console.log("API Response:", response.data);

      // Speak the assistant's response
      speakText(response.data.response);
    } catch (error) {
      console.error("Error making API call:", error);
      const errorMessage = {
        type: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      handleMessageAdd(errorMessage);
      if (typeof onMessageAdd === 'function') {
        onMessageAdd(errorMessage);
      }
    }
  };

  const handleChatCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const speakTextWrapper = useCallback((text) => {
    speakText(text, true, setIsSpeaking, () => {}, () => {});
  }, [setIsSpeaking]);

  return (
    <>
      <header className="text-center my-10 p-4 md:p-10">
        <h1 className="text-5xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Check Out Some Demos
        </h1>
        <div className="w-24 h-1 bg-orange-400 mx-auto mb-6"></div>
        <p className="mt-3 text-base md:text-lg text-gray-500">
          Discover the features and capabilities of our latest demos and see how
          they can benefit you.
        </p>
      </header>
      <Box className="relative h-[300px] md:h-[500px]">
        {/* Container for background image and button */}
        <Box className="relative h-full">
          <Box
            className="absolute inset-0 bg-cover bg-center transition-all duration-500 rounded-3xl lg:mx-20"
            style={{ backgroundImage: `url(${DemoData[currentIndex].img})` }}
           
          >
            <Box className="w-full h-full flex items-center justify-center p-4 md:p-6">
              <Box className="absolute inset-y-1/2 left-4 transform -translate-y-80 hidden md:flex flex-col bg-opacity-50 p-4 md:p-6 rounded-lg w-full max-w-xs md:max-w-md">
                <Box className="text-center bg-opacity-50 p-4 bg-transparent backdrop-blur-3xl border-4 rounded-3xl">
                  <Typography
                    variant="h2"
                    className="text-orange-400 text-3xl md:text-5xl font-bold mb-4 border-b-2"
                  >
                    {DemoData[currentIndex].name}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-white text-sm md:text-base leading-relaxed text-justify mb-6" // Increased margin-bottom
                  >
                    {DemoData[currentIndex].description}
                  </Typography>
                  {/* Button container */}
                  <Box className="flex justify-center w-full mt-4"> {/* Changed to flex and added margin-top */}
                    <Button
                      variant="contained"
                      onClick={handleClick} // Ensure this is correctly set
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 text-white py-2 px-4 md:py-2 md:px-6 rounded-full text-sm md:text-lg shadow-lg transition-all duration-300"
                    >
                      Know More
                    </Button>
                  </Box>
                </Box>
                </Box>
              </Box>
            </Box>
          </Box>


        {/* Thumbnail images */}
        <Box className="absolute bottom-20 w-full flex justify-end space-x-2 overflow-x-auto pb-4 ">
          {DemoData.map((item, index) => (
            <Box
              key={index}
              className={`cursor-pointer border-2 rounded-3xl ${
                index === currentIndex
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-[100px] h-[150px] md:w-[150px] md:h-[200px] object-cover rounded-3xl"
              />
            </Box>
          ))}
        </Box>
      </Box>
      <ChatConversation
        onSendMessage={handleSendMessage}
        onCollapse={handleChatCollapse}
        isCollapsed={isCollapsed}
        isSpeaking={isSpeaking}
        isVoiceMode={isVoiceMode}
        setIsVoiceMode={setIsVoiceMode}
        darkMode={darkMode}
      />
    </>
  );
};

export default Demo;

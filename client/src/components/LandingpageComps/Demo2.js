import React, { useState, useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { DemoData } from "../../InformationFiles/LandingPageInfo";
import axios from "axios";
import ChatConversation from "../chathistory/chatconversation";

const Demo = ({ onMessageAdd }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleMessageAdd = (newMessage) => {
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  const handleSendMessage = (newMessage) => {
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    // You might want to add API call logic here similar to BlobComponent's handleSendMessage
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
    try {
      onMessageAdd({
        type: "user",
        content: `Tell me more about ${DemoData[currentIndex].name}`,
      });
      const response = await axios.post(
        "http://localhost:8000/api/website-interaction/",
        {
          user_input: `Tell me about ${DemoData[currentIndex].name} if You Dont have information tell me what u have regarding demo section`,
          model_name: "4o-mini",
          section_id: "demo-section",
          user_context: {},
        }
      );
      onMessageAdd({ type: "assistant", content: response.data.response });
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error making API call:", error);
      onMessageAdd({
        type: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      });
    }
  };

  return (
    <>
      <header className="text-center my-10 p-4 md:p-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-orange-400">
          Check Out Some Demos
        </h1>
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
                    className="text-orange-400 text-3xl md:text-5xl font-bold mb-2 border-b-2"
                  >
                    {DemoData[currentIndex].name}
                  </Typography>
                  <Typography
                    variant="h5"
                    className="text-gray-400 text-lg md:text-2xl font-semibold mb-4"
                  >
                    Discover Our Product
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-white text-sm md:text-base leading-relaxed text-justify"
                  >
                    {DemoData[currentIndex].description}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Button container */}
          <Box className="absolute bottom-5 w-5/6 flex  justify-end  space-x-2 overflow-x-auto pb-4 ">
            <Button
              variant="contained"
              onClick={handleClick}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 text-white py-2 px-4 md:py-2 md:px-6 rounded-full text-sm md:text-lg shadow-lg transition-all duration-300 ml-10"
            >
              Know More
            </Button>
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
        messages={chatMessages}
        isOpen={isChatOpen}
        onClose={handleChatClose}
        onSendMessage={handleSendMessage}
        onCollapse={() => {}} // Add collapse functionality if needed
        isCollapsed={false}
        isSpeaking={false}
      />
    </>
  );
};

export default Demo;

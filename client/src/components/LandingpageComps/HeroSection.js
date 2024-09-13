import React, { useState, useEffect, useCallback } from "react";
import { Typography, Button, Box } from "@mui/material";
import Typical from "react-typical";
import { typicalConfig } from "../../InformationFiles/LandingPageInfo";
import { FaArrowRight } from 'react-icons/fa';
import LazyLoad from 'react-lazyload';
import axios from "axios";
import { API_BASE_URL } from '../../lib/config';
import { useChat } from '../../context/ChatContext';
import { speakText } from '../../utils/speechUtils';

function HeroSection2() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = 'static/hero1.jpeg';
    img.onload = () => setImageLoaded(true);
  }, []);

  const { addMessage, toggleChat } = useChat();

  const speakTextWrapper = useCallback((text) => {
    speakText(text, true, setIsSpeaking, () => {}, () => {});
  }, [setIsSpeaking]);

  const handleVisualizingAIClick = async () => {
    const userMessage = "Tell me more about the Think41 centre";
    
    try {
      addMessage({
        type: "user",
        content: userMessage,
      });

      const response = await axios.post(
        `${API_BASE_URL}/api/website-interaction/`,
        {
          user_input: `The user has clicked 'Visualizing AI' on our landing page and asked: "${userMessage}". Please provide a comprehensive yet concise explanation of:
1. What is the Think41 centre and how does it relate to Visualizing AI?
2. How does the Think41 centre help in understanding and implementing AI solutions?
3. What are the key benefits of using the Think41 centre in software development?
4. How does the Think41 centre enhance the client's understanding of AI integration?
5. What makes Think41's approach to AI visualization unique?`,
          model_name: "4o-mini",
          section_id: "hero-section",
          user_context: {
            section: "Hero",
            user_action: "Clicked 'Visualizing AI' button",
          },
        }
      );

      const assistantMessage = { 
        type: "assistant", 
        content: response.data.response + "\n\nWhich demo would you like to check out?\n\n1. RQ (RecruitmentQ)\n2. CQ (CandidateQ)\n3. Recruit41\n\nPlease reply with the number of your choice."
      };
      addMessage(assistantMessage);
      toggleChat();
      speakTextWrapper(assistantMessage.content);

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error making API call:", error);
      const errorMessage = {
        type: "assistant",
        content: "I apologize, but I encountered an error while fetching information about the Think41 centre. Please try again or contact our support team for assistance.",
      };
      addMessage(errorMessage);
      speakTextWrapper(errorMessage.content);
    }
  };

  const handleDemoChoice = async (choice) => {
    let demoUrl;
    let demoName;
    switch(choice) {
      case "1":
        demoUrl = "https://dev-41-1081098542602.us-central1.run.app/";
        demoName = "RQ (RecruitmentQ)";
        break;
      case "2":
        demoUrl = "https://dev-41-1081098542602.us-central1.run.app/";
        demoName = "CQ (CandidateQ)";
        break;
      case "3":
        demoUrl = "https://demo.recruit41.com/";
        demoName = "Recruit41";
        break;
      default:
        addMessage({
          type: "assistant",
          content: "I'm sorry, but that's not a valid choice. Please choose 1, 2, or 3."
        });
        return;
    }

    const responseMessage = `Great! You've chosen to check out the ${demoName} demo. You can access it at: ${demoUrl}\n\nWould you like me to explain more about this specific product?`;
    addMessage({
      type: "assistant",
      content: responseMessage
    });
    speakTextWrapper(responseMessage);
  };

  return (
    <LazyLoad height={'calc(100vh - 300px)'} once>
      <Box
        sx={{
          height: { xs: "auto", lg: "calc(100vh - 300px)" },
          backgroundImage: imageLoaded ? `url('static/hero1.jpeg')` : 'none',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          overflow: "hidden",
          padding: 0,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          color: "white",
          transition: "background-image 0.3s ease-in",
        }}
      >
        {/* Black tint overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Black tint with 70% opacity
            zIndex: 0,
          }}
        />

        {/* Left section - Text and Buttons */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: { xs: "100%", lg: "50%" },
            p: { xs: 4, lg: 8 },
            textAlign: { xs: "center", lg: "left" },
          }}
        >
          <div className="flex flex-col items-center lg:items-start">
            <Typography
              variant="h3"
              component="h3"
              color="white"
              fontWeight="bold"
              fontFamily="Baskervville SC, serif"
              gutterBottom
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "4rem" },
                lineHeight: "1.2",
                maxWidth: "100%",
                height: { xs: "4rem", sm: "5rem", md: "6rem", lg: "20rem" },
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#f57c00" }}>
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
  color="#6a6a6a" // Light gray color
  fontWeight="medium"
  sx={{
    fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem", lg: "1.7rem" },
    mb: 4,
  }}
>
  Crafting intelligent software to solve your unique challenges.
</Typography>


            <Box className="flex justify-center lg:justify-start">
              <Button
                onClick={handleVisualizingAIClick}
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
                    backgroundColor: "orange",
                    transition: "left 0.5s ease",
                    zIndex: -1,
                  },
                  "&:hover::before": {
                    left: 0,
                  },
                }}
              >
                Visualizing AI
                <FaArrowRight style={{ marginLeft: '8px' }} />
              </Button>
            </Box>
          </div>
        </Box>
      </Box>
    </LazyLoad>
  );
}

export default HeroSection2;

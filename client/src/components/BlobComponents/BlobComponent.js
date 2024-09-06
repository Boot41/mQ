import React, { useCallback, useState, useRef } from "react";
import axios from "axios";
import { useSection } from "../TrackUserComps/SectionContext";
import Jarvis from "./Jarvis";

const BlobComponent = () => {
  const { currentSection } = useSection();
  const [isRecording, setIsRecording] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const playerRef = useRef(null);

  const handleClick = useCallback(async () => {
    if (!currentSection) {
      console.error("Section ID is not set");
      return;
    }

    setIsRecording(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/website-interaction/",
        {
          user_input: `As an AI assistant for Think41's website, I'm here to help you understand the content of the ${currentSection} section. Based on this section, could you provide a brief overview of its key points and how they relate to Think41's services? Additionally, what specific questions might a user have about this section, and how can I best address them?`,
          model_name: "4o-mini",
          section_id: currentSection,
          user_context: {},
        }
      );

      console.log("API Response:", response.data);
      // Here you can add logic to display the response to the user
    } catch (error) {
      console.error("Error making API call:", error);
    } finally {
      setIsRecording(false);
    }
  }, [currentSection]);

  return (
    <div ref={playerRef} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
      <Jarvis
        isRecording={isRecording}
        isMinimized={isMinimized}
        isClosing={isClosing}
        playerRef={playerRef}
        onClick={handleClick}
      />
    </div>
  );
};

export default BlobComponent;

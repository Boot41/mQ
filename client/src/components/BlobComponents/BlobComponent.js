import React, { useCallback } from "react";
import axios from "axios";
import ai from "../../assets/images/ai.gif";
import { useSection } from "../TrackUserComps/SectionContext";

const BlobComponent = () => {
  const { currentSection } = useSection();

  const handleClick = useCallback(async () => {
    if (!currentSection) {
      console.error("Section ID is not set");
      return;
    }

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
    }
  }, [currentSection]);

  return (
    <div>
      <div className="fixed bottom-24 right-24 w-24 h-24 z-50">
        <img
          src={ai}
          alt="AI Assistant"
          className="w-full h-full object-contain bg-blend-lighten"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default BlobComponent;

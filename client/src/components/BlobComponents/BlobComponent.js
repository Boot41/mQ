import React, { useCallback, useState, useRef } from "react";
import axios from "axios";
import { useSection } from "../TrackUserComps/SectionContext";
import Jarvis from "./Jarvis";
import ChatConversation from "../chathistory/chatconversation";

const BlobComponent = () => {
  const { currentSection } = useSection();
  const [isRecording, setIsRecording] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const playerRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
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
          user_input: `You are an AI assistant for Think41's website. The user is currently viewing the ${currentSection} section. Provide a brief, friendly welcome and offer assistance. Highlight 1-2 key points about this section and how they relate to Think41's services. Be concise and engaging.`,
          model_name: "4o-mini",
          section_id: currentSection,
          user_context: {
            interaction_type: "initial_greeting",
            current_section: currentSection
          },
        }
      );

      console.log("API Response:", response.data);
      
      // Add the response to chat messages
      setChatMessages(prevMessages => [
        ...prevMessages,
        { type: 'user', content: `Question about ${currentSection} section` },
        { type: 'assistant', content: response.data.response }
      ]);
      
      // Open the chat conversation
      setIsChatOpen(true);
    } catch (error) {
      console.error("Error making API call:", error);
    } finally {
      setIsRecording(false);
    }
  }, [currentSection]);

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  const handleChatCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSendMessage = async (newMessage) => {
    setChatMessages(prevMessages => [...prevMessages, newMessage]);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/website-interaction/",
        {
          user_input: newMessage.content,
          model_name: "4o-mini",
          section_id: currentSection,
          user_context: {
            chat_opened: true,
            interaction_type: "text_input"
          },
        }
      );

      console.log("API Response:", response.data);

      // Add the assistant's response to chat messages
      setChatMessages(prevMessages => [
        ...prevMessages,
        { type: 'assistant', content: response.data.response }
      ]);
    } catch (error) {
      console.error("Error making API call:", error);
      // Optionally, add an error message to the chat
      setChatMessages(prevMessages => [
        ...prevMessages,
        { type: 'assistant', content: "Sorry, I encountered an error. Please try again." }
      ]);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
      <div ref={playerRef}>
        <Jarvis
          isRecording={isRecording}
          isMinimized={isMinimized}
          isClosing={isClosing}
          playerRef={playerRef}
          onClick={handleClick}
        />
      </div>
      <ChatConversation 
        messages={chatMessages}
        isOpen={isChatOpen}
        onClose={handleChatClose}
        onSendMessage={handleSendMessage}
        onCollapse={handleChatCollapse}
        isCollapsed={isCollapsed}
      />
    </div>
  );
};

export default BlobComponent;

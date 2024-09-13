import React from 'react';
import BlobComponent from './BlobComponent';
import ChatConversation from '../chathistory/chatconversation';
import { useChat } from '../../context/ChatContext';
import './BlobChatWrapper.css';
import axios from 'axios';
import { useSection } from "../TrackUserComps/SectionContext";
import  { API_BASE_URL } from '../../lib/config';

const BlobChatWrapper = () => {
  const { isChatOpen, toggleChat, addMessage } = useChat();
  const { currentSection } = useSection();
  const handleSendMessage = async (message) => {
    addMessage(message);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/website-interaction/`,
        {
          user_input: message.content,
          model_name: "4o-mini",
          section_id: currentSection,
          user_context: {
            chat_opened: true,
            interaction_type: "text_input"
          },
        }
      );

      console.log("API Response:", response.data);

      const assistantResponse = response.data.response;
      const assistantMessage = { type: 'assistant', content: assistantResponse };
      addMessage(assistantMessage);

      // If you want to implement speech, you can add it here
      // speakTextWrapper(assistantResponse);
    } catch (error) {
      console.error("Error making API call:", error);
      const errorMessage = { type: 'assistant', content: "Sorry, I encountered an error. Please try again." };
      addMessage(errorMessage);
    }
  };

  return (
    <div className="blob-chat-wrapper">
      <BlobComponent />
      {isChatOpen && (
        <ChatConversation
          onSendMessage={handleSendMessage}
          onCollapse={toggleChat}
          isCollapsed={false}
          isVoiceMode={true}
          setIsVoiceMode={() => {}}
          darkMode={false}
          isSpeaking={false}
        />
      )}
    </div>
  );
};

export default BlobChatWrapper;
import React, { createContext, useState, useContext, useCallback } from 'react';
import { speakText } from '../utils/speechUtils';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeechSynthesisReady, setIsSpeechSynthesisReady] = useState(false);

  const addMessage = (message) => {
    setChatMessages((prevMessages) => [...prevMessages, message]);
  };

  const clearChatMessages = () => {
    setChatMessages([]);
  };

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  const speakTextWrapper = useCallback(
    (text) => {
      if (!isSpeechSynthesisReady) {
        console.warn("Speech synthesis not ready. Skipping speech.");
        return;
      }
      if (voices.length === 0) {
        console.error("No voices available for speech synthesis.");
        return;
      }
      speakText(text, true, setIsSpeaking, () => {}, () => {}, voices, selectedVoice);
    },
    [voices, selectedVoice, isSpeechSynthesisReady]
  );

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

    const responseMessage = `Great! You've chosen to check out the <a href="${demoUrl}" target="_blank" rel="noopener noreferrer">${demoName}</a> demo. You can access it by clicking the product name.\n\nWould you like me to explain more about this specific product?`;
    addMessage({
      type: "assistant",
      content: responseMessage,
      isHtml: true
    });
    speakTextWrapper(`Great! You've chosen to check out the ${demoName} demo. Would you like me to explain more about this specific product?`);
  };

  return (
    <ChatContext.Provider value={{ 
      chatMessages, 
      isChatOpen, 
      isSpeaking,
      addMessage, 
      clearChatMessages, 
      toggleChat,
      handleDemoChoice,
      speakTextWrapper,
      setIsChatOpen,
      voices,
      setVoices,
      selectedVoice,
      setSelectedVoice,
      isSpeechSynthesisReady,
      setIsSpeechSynthesisReady
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
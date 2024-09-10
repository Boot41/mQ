import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const addMessage = (message) => {
    setChatMessages((prevMessages) => [...prevMessages, message]);
  };

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  return (
    <ChatContext.Provider value={{ chatMessages, isChatOpen, addMessage, toggleChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
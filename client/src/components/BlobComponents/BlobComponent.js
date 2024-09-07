import React, { useCallback, useState, useRef } from "react";
import axios from "axios";
import { useSection } from "../TrackUserComps/SectionContext";
import Jarvis from "./Jarvis";
import ChatConversation from "../chathistory/chatconversation";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const BlobComponent = () => {
  const { currentSection } = useSection();
  const [isRecording, setIsRecording] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const playerRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(true);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Text-to-speech not supported in this browser.');
    }
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({
    continuous: true,
    onError: (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech' || event.error === 'audio-capture') {
        startRecording();
      }
    }
  });

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
    if (isVoiceMode) {
      stopRecording();
    }

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

      const assistantResponse = response.data.response;
      setChatMessages(prevMessages => [...prevMessages, { type: 'assistant', content: assistantResponse }]);

      speak(assistantResponse);
    } catch (error) {
      console.error("Error making API call:", error);
      const errorMessage = "Sorry, I encountered an error. Please try again.";
      setChatMessages(prevMessages => [...prevMessages, { type: 'assistant', content: errorMessage }]);
      speak(errorMessage);
    } finally {
      if (isVoiceMode) {
        startRecording();
      }
    }
  };

  const startRecording = useCallback(() => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-GB' });
  }, []);

  const stopRecording = useCallback(() => {
    SpeechRecognition.stopListening();
  }, []);

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
        isSpeaking={isSpeaking}
        isVoiceMode={isVoiceMode}
        setIsVoiceMode={setIsVoiceMode}
        transcript={transcript}
        resetTranscript={resetTranscript}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />
    </div>
  );
};

export default BlobComponent;

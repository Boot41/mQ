import React, { useCallback, useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSection } from "../TrackUserComps/SectionContext";
import Jarvis from "./Jarvis";
import { useChat } from '../../context/ChatContext';
import { speakText } from '../../utils/speechUtils';
import { API_BASE_URL } from '../../lib/config';
import './BlobComponent.css';
import { useSpeechRecognition } from '../../utils/useSpeechRecognition';
// Add this import statement
import ChatConversation from '../chathistory/chatconversation';

const BlobComponent = ({ additionalMessages = [], onMessageAdd }) => {
  const [voices, setVoices] = useState([]);
  const [isSpeechSynthesisReady, setIsSpeechSynthesisReady] = useState(false);
  const [isSpeechInitialized, setIsSpeechInitialized] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const loadVoices = useCallback(() => {
    const availableVoices = window.speechSynthesis.getVoices();
    console.log('Voices loaded:', availableVoices);
    if (availableVoices.length > 0) {
      setVoices(availableVoices);
      setIsSpeechSynthesisReady(true);
    }
  }, []);

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Try to load voices immediately
    loadVoices();

    // If voices aren't loaded immediately, try again after a short delay
    const timeoutId = setTimeout(loadVoices, 1000);

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      clearTimeout(timeoutId);
    };
  }, [loadVoices]);

  const initializeSpeechSynthesis = useCallback(() => {
    if (isSpeechInitialized) return;

    const utterance = new SpeechSynthesisUtterance('');
    utterance.onend = () => {
      console.log('Speech synthesis initialized successfully');
      setIsSpeechInitialized(true);
    };
    utterance.onerror = (event) => {
      console.warn('Speech synthesis initialization error:', event);
      if (event.error === 'not-allowed') {
        console.log('Speech synthesis permission denied. Please try interacting with the page again.');
      }
    };
    
    window.speechSynthesis.speak(utterance);
  }, [isSpeechInitialized]);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!isSpeechInitialized) {
        initializeSpeechSynthesis();
      }
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [initializeSpeechSynthesis, isSpeechInitialized]);

  const { currentSection } = useSection();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [progress, setProgress] = useState(0);
  const { chatMessages, isChatOpen, addMessage, toggleChat } = useChat();
  const playerRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    startRecording,
    stopRecording,
    isVoiceMode,
    toggleVoiceMode
  } = useSpeechRecognition((newTranscript) => {
    handleSendMessage({ type: 'user', content: newTranscript });
  });
  useEffect(() => {
    if (additionalMessages.length > 0) {
      additionalMessages.forEach(message => addMessage(message));
    }
  }, [additionalMessages, addMessage]);

  const handleSpeechEnd = useCallback(() => {
    setIsSpeaking(false);
    setTimeout(() => {
      if (isVoiceMode) {
        startRecording();
      }
    }, 5000);
  }, [isVoiceMode, startRecording, setIsSpeaking]);

  const speakTextWrapper = useCallback((text) => {
    console.log("speakTextWrapper called with:", text);
    if (!isSpeechSynthesisReady) {
      console.warn("Speech synthesis is not ready yet. Skipping speech.");
      return;
    }
    setIsSpeaking(true);
    try {
      speakText(text, true, setIsSpeaking, stopRecording, () => {
        console.log("Speech ended callback");
        setIsSpeaking(false);
        handleSpeechEnd();
      }, voices);
    } catch (error) {
      console.error("Error in speech synthesis:", error);
      setIsSpeaking(false);
    }
  }, [isSpeechSynthesisReady, setIsSpeaking, stopRecording, handleSpeechEnd, voices]);

  const handleClick = useCallback(async () => {
    if (!currentSection) {
      console.error("Section ID is not set");
      return;
    }
    
    setIsRecording(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/website-interaction/`,
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
      
      addMessage({ type: 'user', content: `Question about ${currentSection} section` });
      addMessage({ type: 'assistant', content: response.data.response });
      
      toggleChat();
      speakTextWrapper(response.data.response);
    } catch (error) {
      console.error("Error making API call:", error);
      console.log("API Base URL:", API_BASE_URL);
    } finally {
      setIsRecording(false);
    }
  }, [currentSection, addMessage, speakTextWrapper, toggleChat, setIsRecording]);

  const handleSendMessage = async (newMessage) => {
    addMessage(newMessage);
    if (onMessageAdd) {
      onMessageAdd(newMessage);
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/website-interaction/`,
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
      addMessage({ type: 'assistant', content: assistantResponse });

      speakTextWrapper(assistantResponse);
      setProgress(response.data.progress || 0);
    } catch (error) {
      console.error("Error making API call:", error);
      console.log("API Base URL:", API_BASE_URL);
      const errorMessage = "Sorry, I encountered an error. Please try again.";
      addMessage({ type: 'assistant', content: errorMessage });
      speakTextWrapper(errorMessage);
    }
  };

  const handleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  useEffect(() => {
    if (isVoiceMode && transcript) {
      handleSendMessage({ type: 'user', content: transcript });
    }
  }, [isVoiceMode, transcript, handleSendMessage]);

  return (
    <div className="blob-container" id="unique-blob-container">
      <div className="blob-chat-wrapper">
        {isChatOpen && (
          <ChatConversation
            onSendMessage={handleSendMessage}
            onCollapse={handleCollapse}
            isCollapsed={isCollapsed}
            darkMode={false}
            isSpeaking={isSpeaking}
            setIsSpeaking={setIsSpeaking}
          />
        )}
        <div ref={playerRef} className="blob-wrapper">
          <Jarvis
            isRecording={isRecording}
            isMinimized={isMinimized}
            isClosing={isClosing}
            isSpeaking={isSpeaking}
            playerRef={playerRef}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default BlobComponent;

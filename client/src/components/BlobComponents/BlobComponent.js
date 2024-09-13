import React, { useCallback, useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSection } from "../TrackUserComps/SectionContext";
import Jarvis from "./Jarvis";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { CSSTransition } from 'react-transition-group';
import { FaChevronUp, FaChevronDown, FaTimes } from 'react-icons/fa';
import { useChat } from '../../context/ChatContext';
import { speakText } from '../../utils/speechUtils';
import {API_BASE_URL} from '../../lib/config';
import './BlobComponent.css'; // Make sure to create this file


const BlobComponent = ({ additionalMessages = [], onMessageAdd }) => {
  const { currentSection } = useSection();
  const [isRecording, setIsRecording] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(true);

  const [darkMode, setDarkMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVoiceBotActive, setIsVoiceBotActive] = useState(true);

  const [abortController, setAbortController] = useState(new AbortController());
  const [speakingTimeoutId, setSpeakingTimeoutId] = useState(null);
  const [pauseTimeoutId, setPauseTimeoutId] = useState(null);

  const { chatMessages, isChatOpen, addMessage, toggleChat } = useChat();

  useEffect(() => {
    if (additionalMessages.length > 0) {
      additionalMessages.forEach(message => addMessage(message));
    }
  }, [additionalMessages, addMessage]);

  const stopRecording = useCallback(() => {
    setAbortController(new AbortController());
    abortController.abort();
    SpeechRecognition.stopListening();
    if (speakingTimeoutId) {
      clearTimeout(speakingTimeoutId);
    }
    if (pauseTimeoutId) {
      clearTimeout(pauseTimeoutId);
    }
  }, [abortController, speakingTimeoutId, pauseTimeoutId]);

  const handleSpeechEnd = useCallback(() => {
    setIsSpeaking(false);
    setTimeout(() => {
      if (isVoiceMode) {
        startRecording();
      }
    }, 5000);
  }, [isVoiceMode]);

  const speakTextWrapper = useCallback((text) => {
    speakText(text, true, setIsSpeaking, () => {}, () => {});
  }, []);

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

  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const welcomeMessageRef = useRef(null);

  const playerRef = useRef(null);

  const [chatKey, setChatKey] = useState(0);

  useEffect(() => {
    if (showWelcomeMessage) {
      const timer = setTimeout(() => {
        setShowWelcomeMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showWelcomeMessage]);

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      console.log('Voices loaded:', voices);
    };

    speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Initial load

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleClick = useCallback(async () => {
    if (!currentSection) {
      console.error("Section ID is not set");
      return;
    }
    
    setIsRecording(true);
    setShowWelcomeMessage(true);

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
      console.log("API Base URL:", API_BASE_URL); // Add this line for debugging
    } finally {
      setIsRecording(false);
    }
  }, [currentSection, addMessage, speakTextWrapper, toggleChat]);

  const handleChatCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSendMessage = async (newMessage) => {
    addMessage(newMessage);
    if (onMessageAdd) {
      onMessageAdd(newMessage);
    }
    if (isVoiceMode) {
      stopRecording();
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
      console.log("API Base URL:", API_BASE_URL); // Add this line for debugging
      const errorMessage = "Sorry, I encountered an error. Please try again.";
      addMessage({ type: 'assistant', content: errorMessage });
      speakTextWrapper(errorMessage);
    } finally {
      if (isVoiceMode) {
        startRecording();
      }
    }
  };

  const startRecording = useCallback(() => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-GB' });
    if (speakingTimeoutId) {
      clearTimeout(speakingTimeoutId);
    }
    const id = setTimeout(() => {
      // Placeholder for any future logic
    }, 10000);
    setSpeakingTimeoutId(id);
  }, [speakingTimeoutId]);

  const testSpeech = () => {
    console.log('Testing speech...');
    if ('speechSynthesis' in window) {
      const voices = speechSynthesis.getVoices();
      console.log('Available voices:', voices);

      const utterance = new SpeechSynthesisUtterance("This is a test speech.");
      utterance.voice = voices.find(voice => voice.name === 'Google US English') || voices[0];
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      console.log('Selected voice:', utterance.voice);

      utterance.onstart = () => console.log('Speech started');
      utterance.onend = () => console.log('Speech ended');
      utterance.onerror = (event) => console.error('Speech error:', event);

      // Cancel any ongoing speech
      speechSynthesis.cancel();

      // Speak the new utterance
      speechSynthesis.speak(utterance);

      // Log the speech synthesis state
      console.log('Speech synthesis speaking:', speechSynthesis.speaking);
      console.log('Speech synthesis pending:', speechSynthesis.pending);
      console.log('Speech synthesis paused:', speechSynthesis.paused);
    } else {
      console.error('Speech synthesis not supported');
    }
  };

  const testAudio = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440 Hz
    oscillator.connect(audioContext.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 1000); // Stop after 1 second
    console.log('Audio test started');
  };

  const initializeAudio = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
  };

  // useEffect(() => {
  //   // Cleanup function
  //   return () => {
  //     // Close the chat if it's open
  //     if (isChatOpen) {
  //       toggleChat();
  //     }
  //     // Reset the chat key
  //     setChatKey(prevKey => prevKey + 1);
  //   };
  // }, [isChatOpen, toggleChat]); do 

  return (
    <div className="blob-container" id="unique-blob-container">
      <div className="blob-chat-wrapper">
        {isChatOpen }
        <div ref={playerRef} className="blob-wrapper">
          <Jarvis
            isRecording={isRecording}
            isMinimized={isMinimized}
            isClosing={isClosing}
            playerRef={playerRef}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default BlobComponent;

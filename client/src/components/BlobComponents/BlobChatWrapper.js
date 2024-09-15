// client/src/components/BlobComponents/BlobChatWrapper.js

import React, { useEffect, useState, useRef, useCallback } from 'react';
import BlobComponent from './BlobComponent';
import ChatConversation from '../chathistory/chatconversation';
import { useChat } from '../../context/ChatContext';
import { useSection } from "../TrackUserComps/SectionContext";
import axios from 'axios';
import { API_BASE_URL } from '../../lib/config';
import { speakText } from '../../utils/speechUtils';
import './BlobChatWrapper.css';

/**
 * BlobChatWrapper component integrates the Blob visualizer with the chatbot.
 * It handles user messages, API interactions, and manages speech synthesis.
 */
const BlobChatWrapper = () => {
  const { isChatOpen, setIsChatOpen, toggleChat, addMessage } = useChat();
  const { currentSection } = useSection();
  const [playVideo, setPlayVideo] = useState(false);
  const cancelTokenRef = useRef(null);
  const [voices, setVoices] = useState([]);
  const [isSpeechSynthesisReady, setIsSpeechSynthesisReady] = useState(false);
  const [isSpeechInitialized, setIsSpeechInitialized] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Define additional state variables
  const [isRecording, setIsRecording] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const playerRef = useRef(null);

  /**
   * Load available speech synthesis voices.
   */
  const loadVoices = useCallback(() => {
    const availableVoices = window.speechSynthesis.getVoices();
    console.log('Voices loaded:', availableVoices);
    if (availableVoices.length > 0) {
      const femaleEnglishVoice = availableVoices.find(
        voice => voice.lang.startsWith('en') && /female/i.test(voice.name)
      );
      setSelectedVoice(femaleEnglishVoice || availableVoices.find(voice => voice.lang.startsWith('en')));
      setVoices(availableVoices);
      setIsSpeechSynthesisReady(true);
    }
  }, []);

  /**
   * Initialize speech synthesis on user interaction.
   */
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
        console.log('Speech synthesis permission denied.');
      }
    };

    window.speechSynthesis.speak(utterance);
  }, [isSpeechInitialized]);

  /**
   * Handle user interactions to initialize speech synthesis.
   */
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

  /**
   * Load voices on component mount and when voices change.
   */
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

  /**
   * Handle user responses from ChatConversation.
   * @param {Object} response - The user response object.
   */
  const handleUserResponse = (response) => {
    console.log("User Response:", response);
    // Example: Trigger video playback if the response is affirmative
    const userContent = response.content.toLowerCase();
    if (userContent === 'yes' || userContent === 'play') {
      setPlayVideo(true);
    }
  };

  /**
   * Handles sending messages from the user to the chatbot.
   * Cancels any ongoing request before initiating a new one.
   * Manages speech synthesis for assistant responses.
   * @param {Object} message - The message object containing type and content.
   */
  const handleSendMessage = async (message) => {
    addMessage(message);

    if (message.content.toLowerCase().includes("capitalism")) {
      const promptMessage = {
        type: 'assistant',
        content:
          "We have a video on capitalism. Do you want to play it? Reply with 'yes' or 'play' to start the video."
      };
      addMessage(promptMessage);
      speakTextWrapper(promptMessage.content);
      return;
    }

    // Cancel previous request if exists
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel("Operation canceled due to new request.");
    }
    cancelTokenRef.current = axios.CancelToken.source();

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/website-interaction/`,
        {
          user_input: message.content,
          model_name: "4o-mini",
          section_id: currentSection,
          user_context: {
            interaction_type: "user_message",
            current_section: currentSection
          },
        },
        { cancelToken: cancelTokenRef.current.token }
      );

      console.log("API Response:", response.data);
      
      addMessage({ type: 'assistant', content: response.data.response });
      
      speakTextWrapper(response.data.response);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Previous request canceled:", error.message);
      } else {
        console.error("Error making API call:", error);
      }
    } finally {
      // No longer cancelTokenRef is being used here
    }
  };

  /**
   * Function to handle text-to-speech.
   * Cancels any ongoing speech and speaks the new text.
   * @param {string} text - The text to be spoken.
   */
  const speakTextWrapper = useCallback((text) => {
    if (!isSpeechSynthesisReady) {
      console.warn("Speech synthesis is not ready yet. Skipping speech.");
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    setIsSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice || voices[0] || null;
    utterance.onend = () => {
      console.log("Speech ended");
      setIsSpeaking(false);
    };
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSpeechSynthesisReady, selectedVoice, voices]);

  /**
   * Handle closing the video playback.
   */
  const handleCloseVideo = () => {
    setPlayVideo(false);
  };

  /**
   * Toggle chat open state based on video playback.
   */
  useEffect(() => {
    setIsChatOpen(!playVideo);
  }, [playVideo, setIsChatOpen]);

  const handleClick = () => {
    toggleChat();
  };

  return (
    <div className={`blob-chat-wrapper ${playVideo ? 'blur-background' : ''}`}>
      <BlobComponent 
        playvideo={playVideo} 
        onUserResponse={handleUserResponse} 
        onMessageAdd={(msg) => addMessage(msg)}
        handleSendMessage={handleSendMessage} // Passed as prop
        handleCollapse={toggleChat}         // Passed as prop
        isRecording={isRecording}           // Passed as prop
        setIsRecording={setIsRecording}     // Passed as prop
        isMinimized={isMinimized}           // Passed as prop
        setIsMinimized={setIsMinimized}     // Passed as prop
        isClosing={isClosing}               // Passed as prop
        setIsClosing={setIsClosing}         // Passed as prop
        isSpeaking={isSpeaking}             // Passed as prop
        setIsSpeaking={setIsSpeaking}       // Passed as prop
        playerRef={playerRef}               // Passed as prop
        handleClick={handleClick}           // Passed as prop
      />
      {isChatOpen && (
        <ChatConversation
          onSendMessage={handleSendMessage}
          onCollapse={toggleChat}
          isCollapsed={false}
          darkMode={false}
          isSpeaking={isSpeaking}
          selectedVoice={selectedVoice}
        />
      )}
      {playVideo && (
        <div className="video-container">
          <button
            className="video-close-button"
            onClick={handleCloseVideo}
            aria-label="Close Video"
          >
            &times;
          </button>
          <video
            width="600"
            controls
            autoPlay
            onEnded={() => setPlayVideo(false)}
          >
            <source src="static/harshithcapitalism.mp4" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default BlobChatWrapper;
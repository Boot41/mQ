// client/src/components/BlobComponents/BlobChatWrapper.js

import React, { useEffect, useState, useRef, useCallback } from 'react';
import BlobComponent from './BlobComponent';
import { useChat } from '../../context/ChatContext';
import { useSection } from "../TrackUserComps/SectionContext";
import axios from 'axios';
import { API_BASE_URL } from '../../lib/config';
import useSpeechSynthesis from '../../utils/useSpeechSynthesis';
import './BlobChatWrapper.css';

const BlobChatWrapper = () => {
  const { 
    isChatOpen, 
    setIsChatOpen, 
    toggleChat, 
    addMessage, 
    speakTextWrapper, 
    setVoices, 
    setSelectedVoice,
    isSpeechSynthesisReady,
  } = useChat();
  const { currentSection } = useSection();
  const [playVideo, setPlayVideo] = useState(false);
  const cancelTokenRef = useRef(null);
  const [voicesLocal, setVoicesLocal] = useState([]);
  const [selectedVoiceLocal, setSelectedVoiceLocal] = useState(null);
  const playerRef = useRef(null);

  // **Define Missing State Variables**
  const [isRecording, setIsRecording] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const {
    speak,
    initializeSpeechSynthesis,
    isSpeaking,
    isSpeechSynthesisReady: hookIsSpeechSynthesisReady,
    setIsSpeechSynthesisReady,
    setIsSpeaking
  } = useSpeechSynthesis(voicesLocal, selectedVoiceLocal);

  useEffect(() => {
    setVoices(voicesLocal);
    setSelectedVoice(selectedVoiceLocal);
  }, [voicesLocal, selectedVoiceLocal, setVoices, setSelectedVoice]);

  // Sync hook's readiness with context
  useEffect(() => {
    if (hookIsSpeechSynthesisReady && !isSpeechSynthesisReady) {
      setIsSpeechSynthesisReady(hookIsSpeechSynthesisReady);
    }
  }, [hookIsSpeechSynthesisReady, isSpeechSynthesisReady, setIsSpeechSynthesisReady]);

  // Load voices on component mount and when voices change
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      console.log('Voices loaded:', availableVoices);
      if (availableVoices.length > 0) {
        const femaleEnglishVoice = availableVoices.find(
          voice => voice.lang.startsWith('en') && /female/i.test(voice.name)
        );
        setSelectedVoiceLocal(femaleEnglishVoice || availableVoices.find(voice => voice.lang.startsWith('en')));
        setVoicesLocal(availableVoices);
        setIsSpeechSynthesisReady(true);
        console.log("Speech synthesis is ready.");
      } else {
        console.warn("No voices loaded yet.");
      }
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Try to load voices immediately
    loadVoices();

    // If voices aren't loaded immediately, try again after a short delay
    const timeoutId = setTimeout(loadVoices, 1000);

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      clearTimeout(timeoutId);
    };
  }, [setIsSpeechSynthesisReady, setVoicesLocal, setSelectedVoiceLocal]);

  /**
   * Initialize speech synthesis on user interaction.
   */
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!isSpeechSynthesisReady) {
        initializeSpeechSynthesis();
      }
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [initializeSpeechSynthesis, isSpeechSynthesisReady]);

  /**
   * Handle user responses from ChatConversation.
   * @param {Object} response - The user response object.
   */
  const handleUserResponse = (response) => {
    console.log("User Response:", response);
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
      
      if (isSpeechSynthesisReady) {
        speakTextWrapper(promptMessage.content);
      } else {
        console.warn("Speech synthesis not ready. Skipping speech.");
      }
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
      
      if (isSpeechSynthesisReady) {
        speakTextWrapper(response.data.response);
      } else {
        console.warn("Speech synthesis not ready. Skipping speech.");
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Previous request canceled:", error.message);
      } else {
        console.error("Error making API call:", error);
      }
    }
  };

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
        handleSendMessage={handleSendMessage}
        handleCollapse={toggleChat}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
        isClosing={isClosing}
        setIsClosing={setIsClosing}
        isSpeaking={isSpeaking}
        setIsSpeaking={setIsSpeaking}
        playerRef={playerRef}
        handleClick={handleClick}
      />
      {/* Removed ChatConversation component rendering */}
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
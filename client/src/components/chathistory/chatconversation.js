import React, { useCallback, useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSection } from "../TrackUserComps/SectionContext";
import Jarvis from '../BlobComponents/Jarvis'; // Corrected import path
import { useChat } from '../../context/ChatContext';
import { speakText } from '../../utils/speechUtils';
import { API_BASE_URL } from '../../lib/config';
import '../BlobComponents/BlobComponent.css'; // Corrected import path
import { useCustomSpeechRecognition } from '../../utils/useSpeechRecognition';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaPaperPlane,
  FaUser,
  FaRobot,
  FaTimes
} from 'react-icons/fa';
import './ChatConversation.css';
/**
 * ChatConversation handles displaying messages and user input.
 */
const ChatConversation = ({ 
  onSendMessage, 
  onCollapse,
  isCollapsed, 
  darkMode,
  isSpeaking,
  selectedVoice // New Prop
}) => {
  const { 
    chatMessages, 
    toggleChat, 
    addMessage, 
    handleDemoChoice,
    isChatOpen
  } = useChat();

  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const {
    isVoiceMode,
    toggleVoiceMode,
    transcript,
    resetTranscript,
    startRecording,
    stopRecording,
    browserSupportsSpeechRecognition
  } = useCustomSpeechRecognition((newTranscript) => {
    console.log("Transcribed text:", newTranscript);
    onSendMessage({ type: 'user', content: newTranscript });
  });

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("Browser does not support speech recognition.");
      return;
    }
  }, [browserSupportsSpeechRecognition]);

  /**
   * Scroll to the bottom of the chat messages.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isChatOpen && !isCollapsed) {
      inputRef.current?.focus();
    }
  }, [chatMessages, isChatOpen, isCollapsed]);

  useEffect(() => {
    if (isVoiceMode && transcript) {
      setInputMessage(transcript);
    }
  }, [isVoiceMode, transcript]);

  /**
   * Handle sending a message when Enter is pressed.
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  /**
   * Handle sending the message.
   */
  const handleSend = () => {
    if (inputMessage.trim() === '') return;
    onSendMessage({ type: 'user', content: inputMessage.trim() });
    setInputMessage('');
    resetTranscript();
  };

  /**
   * Handle sending the message when the send button is clicked.
   */
  const handleSendClick = () => {
    handleSend();
  };

  /**
   * Render the content of each message safely.
   * @param {Object} message - The message object.
   */
  const renderMessageContent = (message) => {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.content) }}
      />
    );
  };

  // Log the selected voice for debugging
  useEffect(() => {
    if (selectedVoice) {
      console.log(`Selected Voice: ${selectedVoice.name}`);
    }
  }, [selectedVoice]);

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, [stopRecording]);

  return (
    <div className={`chat-conversation ${darkMode ? 'dark' : 'light'} ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="chat-header">
        <button 
          onClick={toggleVoiceMode} 
          className={`voice-toggle-button ${isVoiceMode ? 'active' : ''}`} 
          title={isVoiceMode ? "Disable voice input" : "Enable voice input"}
        >
          {isVoiceMode ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </button>
        <button 
          onClick={toggleChat} 
          className="close-chat-button" 
          title="Close chat"
        >
          <FaTimes />
        </button>
      </div>
      <div className="chat-body">
        <div className="messages">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.type}`}>
              <div className="message-icon">
                {msg.type === 'user' ? <FaUser /> : <FaRobot />}
              </div>
              <div className="message-content">
                {renderMessageContent(msg)}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isVoiceMode ? "Speak your message..." : "Type your message..."}
          />
          <button 
            onClick={handleSendClick} 
            className="send-button" 
            title="Send message"
            disabled={isSpeaking}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

ChatConversation.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  onCollapse: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  darkMode: PropTypes.bool.isRequired,
  isSpeaking: PropTypes.bool.isRequired,
  selectedVoice: PropTypes.object
};

export default ChatConversation;
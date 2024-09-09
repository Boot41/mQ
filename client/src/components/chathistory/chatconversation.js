import React, { useState, useRef, useEffect, useCallback } from 'react';
import './ChatConversation.css';
import { FaMicrophone, FaMicrophoneSlash, FaPaperPlane, FaUser, FaRobot, FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import debounce from 'lodash.debounce';
import { useChat } from '../../context/ChatContext';

const ChatConversation = ({ 
  onSendMessage, 
  onCollapse, 
  isCollapsed, 
  isVoiceMode,
  setIsVoiceMode,
  darkMode,
  isSpeaking,
}) => {
  const { chatMessages, isChatOpen, toggleChat } = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [abortController, setAbortController] = useState(new AbortController());
  const [timeoutId, setTimeoutId] = useState(null);
  const [speakingTimeoutId, setSpeakingTimeoutId] = useState(null);
  const [pauseTimeoutId, setPauseTimeoutId] = useState(null);

  const {
    transcript,
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

  useEffect(() => {
    if (isVoiceMode && transcript !== '') {
      setInputMessage(transcript);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (pauseTimeoutId) {
        clearTimeout(pauseTimeoutId);
      }
      const id = setTimeout(() => {
        setTimeout(() => {
          handleSendMessage();
        }, 100);
      }, 4000);
      setTimeoutId(id);

      const pauseId = setTimeout(() => {
        // Placeholder for any future logic
      }, 5000);
      setPauseTimeoutId(pauseId);
    }
  }, [transcript, isVoiceMode]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage({ type: 'user', content: inputMessage.trim() });
      setInputMessage('');
      resetTranscript();
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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

  const toggleVoiceMode = () => {
    if (isVoiceMode) {
      stopRecording();
      resetTranscript();
      setInputMessage('');
    } else {
      startRecording();
    }
    setIsVoiceMode(!isVoiceMode);
  };

  if (!isChatOpen) return null;

  return (
    <div className={`chat-conversation ${isChatOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''} ${darkMode ? 'dark-mode' : ''}`}>
      <div className="chat-header">
        <h3>Chat History</h3>
        <div className="header-buttons">
          {isSpeaking && <span className="speaking-indicator" title="AI is speaking">🔊</span>}
          <button onClick={onCollapse} className="collapse-button" title={isCollapsed ? "Expand" : "Collapse"}>
            {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
          </button>
          <button onClick={toggleChat} className="close-button" title="Close chat">
            <FaTimes />
          </button>
        </div>
      </div>
      <div className={`chat-content ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="chat-messages">
          {chatMessages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <div className="message-icon">
                {message.type === 'user' ? <FaUser /> : <FaRobot />}
              </div>
              <div className="message-content">{message.content}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="chat-input-container">
        <button
          onClick={toggleVoiceMode}
          className={`voice-mode-button ${isVoiceMode ? 'active' : ''}`}
          type="button"
          title={isVoiceMode ? "Disable voice input" : "Enable voice input"}
        >
          {isVoiceMode ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </button>
        <input
          ref={inputRef}
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={isVoiceMode ? "Speak your message..." : "Type your message..."}
          className="input-field"
        />
        <button onClick={handleSendMessage} className="send-button" type="button" title="Send message">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatConversation;

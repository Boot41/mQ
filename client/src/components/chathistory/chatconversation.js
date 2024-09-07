import React, { useState, useRef, useEffect, useCallback } from 'react';
import './ChatConversation.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaMicrophone, FaMicrophoneSlash, FaPaperPlane } from 'react-icons/fa';

const ChatConversation = ({ 
  messages, 
  isOpen, 
  onClose, 
  onSendMessage, 
  onCollapse, 
  isCollapsed, 
  isSpeaking,
  isVoiceMode,
  setIsVoiceMode,
  transcript,
  resetTranscript,
  startRecording,
  stopRecording
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (isVoiceMode && transcript) {
      setInputMessage(transcript);
    }
  }, [isVoiceMode, transcript]);

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

  const toggleVoiceMode = () => {
    if (isVoiceMode) {
      stopRecording();
      resetTranscript();
    } else {
      startRecording();
    }
    setIsVoiceMode(!isVoiceMode);
  };

  return (
    <div className={`chat-conversation ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="chat-header">
        <h3>{isCollapsed ? 'Chat' : 'Chat History'}</h3>
        <div className="header-buttons">
          {isSpeaking && <span className="speaking-indicator">🔊</span>}
          <button onClick={onCollapse} className="collapse-button">
            {isCollapsed ? '▲' : '▼'}
          </button>
          <button onClick={onClose} className="close-button">×</button>
        </div>
      </div>
      {!isCollapsed && (
        <div className="chat-content">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className="message-content">{message.content}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
      <div className="chat-input-container">
        <button
          onClick={toggleVoiceMode}
          className="voice-mode-button"
          type="button"
        >
          {isVoiceMode ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </button>
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="input-field"
        />
        <button onClick={handleSendMessage} className="send-button" type="button">
          <FaPaperPlane />
        </button>
      </div>
      {!isCollapsed && <div className="chat-tail"></div>}
    </div>
  );
};

export default ChatConversation;

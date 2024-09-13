import React, { useState, useRef, useEffect, useCallback } from 'react';
import './ChatConversation.css';
import { FaMicrophone, FaMicrophoneSlash, FaPaperPlane, FaUser, FaRobot, FaChevronDown, FaChevronUp, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { useSpeechRecognition } from '../../utils/useSpeechRecognition';
import { useChat } from '../../context/ChatContext';
import DOMPurify from 'dompurify';

const ChatConversation = ({ 
  onSendMessage, 
  onCollapse,
  isCollapsed, 
  darkMode,
  isSpeaking,
  onUserResponse // Add this prop
  // setIsSpeaking,
  onUserResponse
}) => {
  const { 
    chatMessages, 
    isChatOpen, 
    isSpeaking,
    toggleChat, 
    clearChatMessages, 
    handleDemoChoice,
    speakTextWrapper
  } = useChat();

  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [pauseTimeoutId, setPauseTimeoutId] = useState(null);
  const inputRef = useRef(null);
  const [showNewConversationButton, setShowNewConversationButton] = useState(false);
  const [showBackToChatButton, setShowBackToChatButton] = useState(false);
  const [showMessages, setShowMessages] = useState(true);
  
  const {
    isVoiceMode,
    toggleVoiceMode,
    transcript,
    resetTranscript,
    startRecording,
    stopRecording
  } = useSpeechRecognition((newTranscript) => {
    setInputMessage(newTranscript);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      handleSendMessage();
    }, 4000);
    setTimeoutId(id);
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
      const message = { type: 'user', content: inputMessage.trim() };
      onSendMessage(message);

      // Check if the message is a demo choice
      if (['1', '2', '3'].includes(message.content)) {
        handleDemoChoice(message.content);
      } else if (message.content.toLowerCase() === 'yes' || message.content.toLowerCase() === 'play') {
        onUserResponse(message);
      }

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

  const handleBackButtonClick = () => {
    setShowMessages(false);
    setShowNewConversationButton(true);
    setShowBackToChatButton(true);
  };

  const handleNewConversation = () => {
    clearChatMessages();
    setShowNewConversationButton(false);
    setShowBackToChatButton(false);
    setShowMessages(true);
  };

  const handleBackToChat = () => {
    setShowNewConversationButton(false);
    setShowBackToChatButton(false);
    setShowMessages(true);
  };

  const handleCollapseClick = () => {
    onCollapse();
  };

  const createMarkup = (content) => {
    return { __html: DOMPurify.sanitize(content) };
  };

  const renderMessageContent = (message) => {
    if (message.isHtml) {
      return <div dangerouslySetInnerHTML={createMarkup(message.content)} />;
    }
    return <div>{message.content}</div>;
  };

  if (!isChatOpen) return null;

  return (
    <div className={`chat-conversation ${isCollapsed ? 'collapsed' : ''} ${darkMode ? 'dark-mode' : ''}`}>
      <div className={`chat-header ${isCollapsed ? 'collapsed' : ''}`}>
        <button onClick={handleBackButtonClick} className="back-button" title="Back">
          <FaArrowLeft />
        </button>
        <h3>Chat History</h3>
        <div className="header-buttons">
          {isSpeaking && <span className="speaking-indicator" title="AI is speaking">🔊</span>}
          <button onClick={handleCollapseClick} className="collapse-button" title={isCollapsed ? "Expand" : "Collapse"}>
            {isCollapsed ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <button onClick={toggleChat} className="close-button" title="Close chat">
            <FaTimes />
          </button>
        </div>
      </div>
      <div className={`chat-body ${isCollapsed ? 'collapsed' : ''}`}>
        {showMessages && (
          <div className="chat-messages">
            {chatMessages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className="message-icon">
                  {message.type === 'user' ? <FaUser /> : <FaRobot />}
                </div>
                <div className="message-content">
                  {renderMessageContent(message)}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        {showNewConversationButton && (
          <button onClick={handleNewConversation} className="new-conversation-button">Start New Conversation</button>
        )}
        {showBackToChatButton && (
          <button onClick={handleBackToChat} className="back-to-chat-button">Back to Chat</button>
        )}
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
        <button onClick={handleCollapseClick} className="collapse-button" title={isCollapsed ? "Expand" : "Collapse"}>
          {isCollapsed ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
    </div>
  );
};

export default ChatConversation;



import React, { useState, useRef, useEffect } from 'react';
import './ChatConversation.css';

const ChatConversation = ({ messages, isOpen, onClose, onSendMessage, onCollapse, isCollapsed, isSpeaking }) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage({ type: 'user', content: inputMessage.trim() });
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
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
      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      {!isCollapsed && <div className="chat-tail"></div>}
    </div>
  );
};

export default ChatConversation;

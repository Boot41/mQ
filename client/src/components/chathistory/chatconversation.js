import React, { useState } from 'react';
import './ChatConversation.css';

const ChatConversation = ({ messages, isOpen, onClose, onSendMessage, onCollapse, isCollapsed }) => {
  const [inputMessage, setInputMessage] = useState('');

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
        <div>
          <button onClick={onCollapse} className="collapse-button">
            {isCollapsed ? '▲' : '▼'}
          </button>
          <button onClick={onClose} className="close-button">×</button>
        </div>
      </div>
      {!isCollapsed && (
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <div className="message-content">{message.content}</div>
            </div>
          ))}
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
        <button className="record-button">Record</button>
      </div>
    </div>
  );
};

export default ChatConversation;

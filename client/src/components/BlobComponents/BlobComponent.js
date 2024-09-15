// client/src/components/BlobComponents/BlobComponent.js

import React from "react";
import Jarvis from "./Jarvis";
import './BlobComponent.css';
import PropTypes from 'prop-types';

/**
 * BlobComponent handles the Blob's interactions and UI.
 */
const BlobComponent = ({ 
  playvideo, 
  additionalMessages = [], 
  onMessageAdd, 
  onUserResponse, 
  handleSendMessage, 
  handleCollapse, 
  isRecording, 
  setIsRecording,
  isMinimized,
  setIsMinimized,
  isClosing,
  setIsClosing,
  isSpeaking,
  setIsSpeaking,
  playerRef,
  handleClick
}) => {

  return (
    <div className="blob-container" id="unique-blob-container">
      <div className="blob-chat-wrapper">
        {/* If ChatConversation is managed by BlobChatWrapper, remove it here */}
        <div ref={playerRef} className="blob-wrapper">
          <Jarvis
            isRecording={isRecording}
            isMinimized={isMinimized}
            isClosing={isClosing}
            isSpeaking={isSpeaking}
            setIsSpeaking={setIsSpeaking} // Pass it to Jarvis if needed
            playerRef={playerRef}
            onClick={handleClick}
            playvideo={playvideo}
          />
        </div>
      </div>
    </div>
  );
};

BlobComponent.propTypes = {
  playvideo: PropTypes.bool.isRequired,
  additionalMessages: PropTypes.array,
  onMessageAdd: PropTypes.func.isRequired,
  onUserResponse: PropTypes.func.isRequired,
  handleSendMessage: PropTypes.func.isRequired,
  handleCollapse: PropTypes.func.isRequired,
  isRecording: PropTypes.bool.isRequired,
  setIsRecording: PropTypes.func.isRequired,
  isMinimized: PropTypes.bool.isRequired,
  setIsMinimized: PropTypes.func.isRequired,
  isClosing: PropTypes.bool.isRequired,
  setIsClosing: PropTypes.func.isRequired,
  isSpeaking: PropTypes.bool.isRequired,
  setIsSpeaking: PropTypes.func.isRequired,
  playerRef: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

BlobComponent.defaultProps = {
  additionalMessages: [],
};

export default BlobComponent;
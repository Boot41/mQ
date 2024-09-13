// import React, { useState } from 'react';
// import BlobComponent from './BlobComponent';
// import ChatConversation from '../chathistory/chatconversation';
// import { useChat } from '../../context/ChatContext';
// import './BlobChatWrapper.css';
// import axios from 'axios';
// import { useSection } from "../TrackUserComps/SectionContext";
// import  { API_BASE_URL } from '../../lib/config';
// import { set } from 'react-hook-form';

// const BlobChatWrapper = () => {
//   const { isChatOpen, toggleChat, addMessage } = useChat();
//   const [playvideo,setplayvideo] = useState(false);
//   const { currentSection } = useSection();
//   const handleSendMessage = async (message) => {
//     addMessage(message);

//     if (message.content.toLowerCase().includes("capitalism")) {
//       setplayvideo(true); // Show and play the video if the keyword is found
//       return; // Exit the function here if no API call is required for this message
//     }

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/api/website-interaction/`,
//         {
//           user_input: message.content,
//           model_name: "4o-mini",
//           section_id: currentSection, // You might want to update this if you have section information
//           user_context: {
//             chat_opened: true,
//             interaction_type: "text_input"
//           },
//         }
//       );

//       console.log("API Response:", response.data);

//       const assistantResponse = response.data.response;
//       const assistantMessage = { type: 'assistant', content: assistantResponse };
//       addMessage(assistantMessage);

//       // If you want to implement speech, you can add it here
//       // speakTextWrapper(assistantResponse);
//     } catch (error) {
//       console.error("Error making API call:", error);
//       const errorMessage = { type: 'assistant', content: "Sorry, I encountered an error. Please try again." };
//       addMessage(errorMessage);
//     }
//   };

//   return (
//     <div className="blob-chat-wrapper">
//       {!playvideo && <BlobComponent />}
//       {!playvideo && isChatOpen && (
//         <ChatConversation
//           onSendMessage={handleSendMessage}
//           onCollapse={toggleChat}
//           isCollapsed={false}
//           isVoiceMode={true}
//           setIsVoiceMode={() => {}}
//           darkMode={false}
//           isSpeaking={false}
//         />
//       )}

//       {playvideo &&
//         (<div className='video-container'>
//           <video width="600" controls autoPlay onEnded={() => setplayvideo(false)}> 
//             <source src="static/harshithcapitalism.mp4" type="video/webm" />
//             Your browser does not support the video tag.
//           </video>
//         </div> )
//       }
//     </div>
//   );
// };

// export default BlobChatWrapper;

// import React, { useState } from 'react';
// import BlobComponent from './BlobComponent';
// import ChatConversation from '../chathistory/chatconversation';
// import { useChat } from '../../context/ChatContext';
// import './BlobChatWrapper.css';
// import axios from 'axios';
// import { useSection } from "../TrackUserComps/SectionContext";
// import  { API_BASE_URL } from '../../lib/config';

// const BlobChatWrapper = () => {
//   const { isChatOpen, toggleChat, addMessage } = useChat();
//   const { currentSection } = useSection();
//   const [playVideo, setPlayVideo] = useState(false);

//   const handleSendMessage = async (message) => {
//     addMessage(message);

//     // Check if the input includes the word "capitalism"
//     if (message.content.toLowerCase().includes("capitalism")) {
//       // Ask the user if they want to play the video
//       const promptMessage = { type: 'assistant', content: "We have a video on capitalism. Do you want to play it? Reply with 'yes' or 'play' to start the video." };
//       addMessage(promptMessage);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/api/website-interaction/`,
//         {
//           user_input: message.content,
//           model_name: "4o-mini",
//           section_id: currentSection,
//           user_context: {
//             chat_opened: true,
//             interaction_type: "text_input"
//           },
//         }
//       );

//       console.log("API Response:", response.data);

//       const assistantResponse = response.data.response;
//       const assistantMessage = { type: 'assistant', content: assistantResponse };
//       addMessage(assistantMessage);

//     } catch (error) {
//       console.error("Error making API call:", error);
//       const errorMessage = { type: 'assistant', content: "Sorry, I encountered an error. Please try again." };
//       addMessage(errorMessage);
//     }
//   };

//   // Handle user responses
//   const handleUserResponse = (message) => {
//     if (message.content.toLowerCase() === 'yes' || message.content.toLowerCase() === 'play') {
//       setPlayVideo(true);
//     }
//   };

//   return (
//     <div className={`blob-chat-wrapper ${playVideo ? 'blur-background' : ''}`}>
//       {!playVideo && <BlobComponent />}
//       {!playVideo && isChatOpen && (
//         <ChatConversation
//           onSendMessage={handleSendMessage}
//           onUserResponse={handleUserResponse}
//           onCollapse={toggleChat}
//           isCollapsed={false}
//           isVoiceMode={true}
//           setIsVoiceMode={() => {}}
//           darkMode={false}
//           isSpeaking={false}
//           setPlayVideo={setPlayVideo}
//         />
//       )}
//       {playVideo && (
//           <div className="video-container">
//             <video width="600" controls autoPlay onEnded={() => setPlayVideo(false)}>
//               <source src="static/harshithcapitalism.mp4" type="video/webm" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//       )}
//     </div>
//   );
// };

// export default BlobChatWrapper;

import React, { useState } from 'react';
import BlobComponent from './BlobComponent';
import ChatConversation from '../chathistory/chatconversation';
import { useChat } from '../../context/ChatContext';
import './BlobChatWrapper.css';
import axios from 'axios';
import { useSection } from "../TrackUserComps/SectionContext";
import { API_BASE_URL } from '../../lib/config';

const BlobChatWrapper = () => {
  const { isChatOpen, toggleChat, addMessage } = useChat();
  const { currentSection } = useSection();
  const [playVideo, setPlayVideo] = useState(false);

  const handleSendMessage = async (message) => {
    addMessage(message);

    if (message.content.toLowerCase().includes("capitalism")) {
      const promptMessage = { type: 'assistant', content: "We have a video on capitalism. Do you want to play it? Reply with 'yes' or 'play' to start the video." };
      addMessage(promptMessage);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/website-interaction/`,
        {
          user_input: message.content,
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
      const assistantMessage = { type: 'assistant', content: assistantResponse };
      addMessage(assistantMessage);

    } catch (error) {
      console.error("Error making API call:", error);
      const errorMessage = { type: 'assistant', content: "Sorry, I encountered an error. Please try again." };
      addMessage(errorMessage);
    }
  };

  const handleUserResponse = (message) => {
    if (message.content.toLowerCase().includes("yes")) {
      setPlayVideo(true);
    }
  };

  const handleCloseVideo = () => {
    setPlayVideo(false);
  };

  return (
    <div className={`blob-chat-wrapper ${playVideo ? 'blur-background' : ''}`}>
      {!playVideo && <BlobComponent />}
      {!playVideo && isChatOpen && (
        <ChatConversation
          onSendMessage={handleSendMessage}
          onUserResponse={handleUserResponse}
          onCollapse={toggleChat}
          isCollapsed={false}
          isVoiceMode={true}
          setIsVoiceMode={() => {}}
          darkMode={false}
          isSpeaking={false}
        />
      )}
      {playVideo && (
        <div className="video-container">
          <button className="video-close-button" onClick={handleCloseVideo}>
            &times; {/* Close button for video */}
          </button>
          <video width="600" controls autoPlay onEnded={() => setPlayVideo(false)}>
            <source src="static/harshithcapitalism.mp4" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default BlobChatWrapper;

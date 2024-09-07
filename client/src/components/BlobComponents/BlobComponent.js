import React, { useCallback, useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSection } from "../TrackUserComps/SectionContext";
import Jarvis from "./Jarvis";
import ChatConversation from "../chathistory/chatconversation";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { CSSTransition } from 'react-transition-group';
import { FaChevronUp, FaChevronDown, FaTimes } from 'react-icons/fa';

const BlobComponent = () => {
  const { currentSection } = useSection();
  const [isRecording, setIsRecording] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const playerRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(true);

  const [darkMode, setDarkMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVoiceBotActive, setIsVoiceBotActive] = useState(true);

  const [abortController, setAbortController] = useState(new AbortController());
  const [speakingTimeoutId, setSpeakingTimeoutId] = useState(null);
  const [pauseTimeoutId, setPauseTimeoutId] = useState(null);

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

  const handleSpeechEnd = useCallback(() => {
    setIsSpeaking(false);
    setTimeout(() => {
      if (isVoiceMode) {
        startRecording();
      }
    }, 5000);
  }, [isVoiceMode]);

  const speakText = useCallback((text) => {
    if (isVoiceBotActive && 'speechSynthesis' in window) {
      console.log('BlobComponent: Speaking text:', text);
      const utterances = text.match(/.{1,200}(?:\s|$)/g);
      const voices = speechSynthesis.getVoices();
      
      // Select a specific voice and use it consistently
      const selectedVoice = voices.find(voice => voice.name === 'Google US English') || voices[0];
      console.log('BlobComponent: Selected voice:', selectedVoice.name);

      // Cancel any ongoing speech
      speechSynthesis.cancel();

      utterances.forEach((chunk, index) => {
        const speech = new SpeechSynthesisUtterance(chunk);
        speech.voice = selectedVoice;
        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;
        speech.onstart = () => {
          console.log('BlobComponent: Speech started:', chunk);
          setIsSpeaking(true);
          stopRecording();
        };
        speech.onend = () => {
          console.log('BlobComponent: Speech ended:', chunk);
          if (index === utterances.length - 1) {
            handleSpeechEnd();
          }
        };
        speech.onerror = (event) => {
          console.error('BlobComponent: Speech synthesis error:', event.error);
        };
        speechSynthesis.speak(speech);
      });
    } else {
      console.log('BlobComponent: Speech synthesis not supported or voice bot not active');
    }
  }, [isVoiceBotActive, stopRecording, handleSpeechEnd]);

  const {
    transcript,
    listening,
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

  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const welcomeMessageRef = useRef(null);

  useEffect(() => {
    if (showWelcomeMessage) {
      const timer = setTimeout(() => {
        setShowWelcomeMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showWelcomeMessage]);

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      console.log('Voices loaded:', voices);
    };

    speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Initial load

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleClick = useCallback(async () => {
    if (!currentSection) {
      console.error("Section ID is not set");
      return;
    }

    setIsRecording(true);
    setShowWelcomeMessage(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/website-interaction/",
        {
          user_input: `You are an AI assistant for Think41's website. The user is currently viewing the ${currentSection} section. Provide a brief, friendly welcome and offer assistance. Highlight 1-2 key points about this section and how they relate to Think41's services. Be concise and engaging.`,
          model_name: "4o-mini",
          section_id: currentSection,
          user_context: {
            interaction_type: "initial_greeting",
            current_section: currentSection
          },
        }
      );

      console.log("API Response:", response.data);
      
      setChatMessages(prevMessages => [
        ...prevMessages,
        { type: 'user', content: `Question about ${currentSection} section` },
        { type: 'assistant', content: response.data.response }
      ]);
      
      setIsChatOpen(true);
      speakText(response.data.response);
    } catch (error) {
      console.error("Error making API call:", error);
    } finally {
      setIsRecording(false);
    }
  }, [currentSection]);

  const handleChatClose = () => {
    setIsChatOpen(false);
    setChatMessages([]);
  };

  const handleChatCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSendMessage = async (newMessage) => {
    setChatMessages(prevMessages => [...prevMessages, newMessage]);
    if (isVoiceMode) {
      stopRecording();
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/website-interaction/",
        {
          user_input: newMessage.content,
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
      setChatMessages(prevMessages => [...prevMessages, { type: 'assistant', content: assistantResponse }]);

      speakText(assistantResponse);
      setProgress(response.data.progress || 0);
    } catch (error) {
      console.error("Error making API call:", error);
      const errorMessage = "Sorry, I encountered an error. Please try again.";
      setChatMessages(prevMessages => [...prevMessages, { type: 'assistant', content: errorMessage }]);
      speakText(errorMessage);
    } finally {
      if (isVoiceMode) {
        startRecording();
      }
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

  const testSpeech = () => {
    console.log('Testing speech...');
    if ('speechSynthesis' in window) {
      const voices = speechSynthesis.getVoices();
      console.log('Available voices:', voices);

      const utterance = new SpeechSynthesisUtterance("This is a test speech.");
      utterance.voice = voices.find(voice => voice.name === 'Google US English') || voices[0];
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      console.log('Selected voice:', utterance.voice);

      utterance.onstart = () => console.log('Speech started');
      utterance.onend = () => console.log('Speech ended');
      utterance.onerror = (event) => console.error('Speech error:', event);

      // Cancel any ongoing speech
      speechSynthesis.cancel();

      // Speak the new utterance
      speechSynthesis.speak(utterance);

      // Log the speech synthesis state
      console.log('Speech synthesis speaking:', speechSynthesis.speaking);
      console.log('Speech synthesis pending:', speechSynthesis.pending);
      console.log('Speech synthesis paused:', speechSynthesis.paused);
    } else {
      console.error('Speech synthesis not supported');
    }
  };

  const testAudio = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440 Hz
    oscillator.connect(audioContext.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 1000); // Stop after 1 second
    console.log('Audio test started');
  };

  const initializeAudio = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
  };

  return (
    <div>
      {isChatOpen && (
        <ChatConversation 
          messages={chatMessages}
          isOpen={isChatOpen}
          onClose={handleChatClose}
          onSendMessage={handleSendMessage}
          onCollapse={handleChatCollapse}
          isCollapsed={isCollapsed}
          isSpeaking={isSpeaking} // Pass this from BlobComponent
          isVoiceMode={isVoiceMode}
          setIsVoiceMode={setIsVoiceMode}
          darkMode={darkMode}
        />
      )}
      <CSSTransition
        in={showWelcomeMessage}
        timeout={300}
        classNames="welcome-message"
        unmountOnExit
      >
        <div ref={welcomeMessageRef} className="welcome-message">
          Hello! How can I assist you today?
        </div>
      </CSSTransition>
      <div ref={playerRef} style={{ marginBottom: '80px' }}>
        <Jarvis
          isRecording={isRecording}
          isMinimized={isMinimized}
          isClosing={isClosing}
          playerRef={playerRef}
          onClick={handleClick}
        />
      </div>
      <button onClick={testSpeech}>Test Speech</button>
      <button onClick={initializeAudio}>Initialize Audio</button>
      <button onClick={testAudio}>Test Audio</button>
    </div>
  );
};

export default BlobComponent;

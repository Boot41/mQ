// client/src/hooks/useSpeechSynthesis.js

import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook to manage speech synthesis.
 * @param {Array} voices - Available speech synthesis voices.
 * @param {Object} selectedVoice - The voice selected for speech synthesis.
 */
const useSpeechSynthesis = (voices, selectedVoice) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSpeechSynthesisReady, setIsSpeechSynthesisReady] = useState(false);

  /**
   * Initialize speech synthesis by speaking an empty utterance.
   */
  const initializeSpeechSynthesis = useCallback(() => {
    if (isSpeechSynthesisReady) return;

    const utterance = new SpeechSynthesisUtterance('');
    utterance.onend = () => {
      console.log('Speech synthesis initialized successfully');
      setIsSpeechSynthesisReady(true);
    };
    utterance.onerror = (event) => {
      console.warn('Speech synthesis initialization error:', event);
      if (event.error === 'not-allowed') {
        console.log('Speech synthesis permission denied.');
      }
    };

    window.speechSynthesis.speak(utterance);
  }, [isSpeechSynthesisReady]);

  /**
   * Function to speak text.
   * @param {string} text - The text to be spoken.
   */
  const speak = useCallback(
    (text) => {
      if (!isSpeechSynthesisReady) {
        console.warn('Speech synthesis is not ready yet. Skipping speech.');
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      setIsSpeaking(true);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice || voices[0] || null;
      utterance.onend = () => {
        console.log('Speech ended');
        setIsSpeaking(false);
      };
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    },
    [isSpeechSynthesisReady, selectedVoice, voices]
  );

  /**
   * Pause speech synthesis to prevent interference.
   */
  const pauseSpeech = useCallback(() => {
    window.speechSynthesis.pause();
  }, []);

  /**
   * Resume speech synthesis if needed.
   */
  const resumeSpeech = useCallback(() => {
    window.speechSynthesis.resume();
  }, []);

  return {
    speak,
    initializeSpeechSynthesis,
    isSpeaking,
    pauseSpeech,
    resumeSpeech,
    isSpeechSynthesisReady,
    setIsSpeechSynthesisReady,
  };
};

export default useSpeechSynthesis;
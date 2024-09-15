import { useState, useCallback, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition as useSR } from 'react-speech-recognition';

/**
 * Custom hook for managing speech recognition with debounce.
 * @param {Function} onTranscriptChange - Callback when transcript updates.
 */
export const useCustomSpeechRecognition = (onTranscriptChange) => {
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const [transcriptBuffer, setTranscriptBuffer] = useState('');
  const debounceTimeoutRef = useRef(null);
  const DEBOUNCE_DELAY = 500; // 0.5 seconds for testing

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSR({
    continuous: true,
    interimResults: false, // Disable interim results
    onResult: (result) => {
      setTranscriptBuffer(result);
      // Reset debounce timer
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        onTranscriptChange(result);
        setTranscriptBuffer('');
      }, DEBOUNCE_DELAY);
    },
    onError: (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech' || event.error === 'audio-capture') {
        startRecording();
      }
    }
  });

  const startRecording = useCallback(() => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-GB' });
  }, []);

  const stopRecording = useCallback(() => {
    SpeechRecognition.stopListening();
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    if (transcriptBuffer) {
      onTranscriptChange(transcriptBuffer);
      setTranscriptBuffer('');
    }
  }, [transcriptBuffer, onTranscriptChange]);

  const toggleVoiceMode = useCallback(() => {
    if (isVoiceMode) {
      stopRecording();
      resetTranscript();
    } else {
      startRecording();
    }
    setIsVoiceMode(!isVoiceMode);
  }, [isVoiceMode, stopRecording, resetTranscript, startRecording]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    isVoiceMode,
    toggleVoiceMode,
    startRecording,
    stopRecording,
    transcript: transcriptBuffer,
    resetTranscript,
    browserSupportsSpeechRecognition
  };
};
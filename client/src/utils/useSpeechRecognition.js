import { useState, useCallback, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition as useSpeechRecognitionLib } from 'react-speech-recognition';

export const useSpeechRecognition = (onTranscriptChange) => {
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const [speakingTimeoutId, setSpeakingTimeoutId] = useState(null);
  const [pauseTimeoutId, setPauseTimeoutId] = useState(null);
  const [abortController, setAbortController] = useState(new AbortController());

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognitionLib({
    continuous: true,
    onError: (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech' || event.error === 'audio-capture') {
        startRecording();
      }
    }
  });

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
    if (isVoiceMode && transcript !== '') {
      onTranscriptChange(transcript);
      resetTranscript();
    }
  }, [transcript, isVoiceMode, onTranscriptChange, resetTranscript]);

  return {
    isVoiceMode,
    toggleVoiceMode,
    startRecording,
    stopRecording,
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  };
};
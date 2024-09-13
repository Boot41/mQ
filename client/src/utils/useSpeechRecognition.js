import { useState, useCallback, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition as useSpeechRecognitionLib } from 'react-speech-recognition';

export const useSpeechRecognition = (onTranscriptChange) => {
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const [transcriptBuffer, setTranscriptBuffer] = useState('');
  const [sendTimeout, setSendTimeout] = useState(null);

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognitionLib({
    continuous: true,
    onResult: (result) => {
      setTranscriptBuffer(result);
      if (sendTimeout) clearTimeout(sendTimeout);
      setSendTimeout(setTimeout(() => {
        onTranscriptChange(result);
        setTranscriptBuffer('');
      }, 1500)); // 1.5 seconds delay
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
    if (sendTimeout) clearTimeout(sendTimeout);
    if (transcriptBuffer) {
      onTranscriptChange(transcriptBuffer);
      setTranscriptBuffer('');
    }
  }, [sendTimeout, transcriptBuffer, onTranscriptChange]);

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
    transcript: transcriptBuffer,
    resetTranscript,
    browserSupportsSpeechRecognition
  };
};
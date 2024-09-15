import { useCallback } from 'react';

export const speakText = (
  text,
  shouldSpeak = true,
  setIsSpeaking,
  stopRecording,
  handleSpeechEnd,
  voices,
  selectedVoice
) => {
  console.log("speakText called with:", { text, shouldSpeak, setIsSpeaking, stopRecording, handleSpeechEnd, voices });
  
  if (!shouldSpeak) return;

  if (!('speechSynthesis' in window)) {
    console.error("This browser does not support speech synthesis.");
    return;
  }

  window.speechSynthesis.cancel();
  setIsSpeaking(true);

  if (stopRecording && typeof stopRecording === 'function') {
    stopRecording();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = selectedVoice || voices[0] || null;
  utterance.onend = () => {
    console.log("Speech ended");
    setIsSpeaking(false);
    handleSpeechEnd();
  };
  utterance.onerror = (event) => {
    console.error("Speech synthesis error:", event.error);
    setIsSpeaking(false);
  };

  window.speechSynthesis.speak(utterance);
};
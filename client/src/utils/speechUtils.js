import { useCallback } from 'react';

/**
 * Function to perform text-to-speech.
 * @param {string} text - The text to be spoken.
 * @param {boolean} shouldSpeak - Flag to determine if speaking should occur.
 * @param {function} setIsSpeaking - Function to update speaking state.
 * @param {function} stopRecording - Function to stop recording if necessary.
 * @param {function} handleSpeechEnd - Callback when speech ends.
 * @param {Array} voices - Available speech synthesis voices.
 * @param {Object} selectedVoice - The voice selected for speech synthesis.
 */
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

  if (!voices || voices.length === 0) {
    console.error("No voices available for speech synthesis.");
    setIsSpeaking(false);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = selectedVoice || voices[0];
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
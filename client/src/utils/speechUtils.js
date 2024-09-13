export const speakText = (text, shouldSpeak = true, setIsSpeaking, stopRecording, handleSpeechEnd, voices) => {
  console.log("speakText called with:", { text, shouldSpeak, setIsSpeaking, stopRecording, handleSpeechEnd, voices });
  if (!shouldSpeak) return;

  if (!('speechSynthesis' in window)) {
    console.error("This browser does not support speech synthesis.");
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  setIsSpeaking(true);
  if (stopRecording && typeof stopRecording === 'function') {
    stopRecording();
  }

  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  let currentSentence = 0;

  const speakNextSentence = () => {
    if (currentSentence >= sentences.length) {
      setIsSpeaking(false);
      if (handleSpeechEnd && typeof handleSpeechEnd === 'function') {
        handleSpeechEnd();
      }
      return;
    }

    const speech = new SpeechSynthesisUtterance(sentences[currentSentence]);

    if (voices && voices.length > 0) {
      const englishVoice = voices.find(voice => voice.lang.startsWith('en-') && voice.name.includes('Female'));
      if (englishVoice) {
        speech.voice = englishVoice;
      }
    }

    speech.volume = 1;
    speech.rate = 0.95;
    speech.pitch = 1.05;

    speech.onend = () => {
      currentSentence++;
      speakNextSentence();
    };

    speech.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      currentSentence++;
      speakNextSentence();
    };

    window.speechSynthesis.speak(speech);
  };

  speakNextSentence();

  // Return a function to cancel the speech
  return () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };
};
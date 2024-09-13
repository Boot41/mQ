export const speakText = (text, shouldSpeak = true, setIsSpeaking, stopRecording, handleSpeechEnd, voices, maxRetries = 3) => {
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

  const utterances = text.match(/.{1,200}(?:\s|$)/g) || [text];
  let currentUtterance = 0;

  const speakNextUtterance = (retries = 0) => {
    if (currentUtterance >= utterances.length) {
      setIsSpeaking(false);
      if (handleSpeechEnd && typeof handleSpeechEnd === 'function') {
        handleSpeechEnd();
      }
      return;
    }

    const speech = new SpeechSynthesisUtterance(utterances[currentUtterance]);

    if (voices && voices.length > 0) {
      const maleVoice = voices.find(voice => voice.name.includes('Male')) || voices[0];
      speech.voice = maleVoice;
    }

    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    speech.onstart = () => {
      console.log('Speech started:', utterances[currentUtterance]);
      setIsSpeaking(true);
      stopRecording();
    };

    speech.onend = () => {
      console.log('Speech ended:', utterances[currentUtterance]);
      currentUtterance++;
      speakNextUtterance();
    };

    speech.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      if (retries < maxRetries) {
        console.log(`Retrying speech synthesis (attempt ${retries + 1} of ${maxRetries})...`);
        setTimeout(() => speakNextUtterance(retries + 1), 1000);
      } else {
        console.error(`Failed to synthesize speech after ${maxRetries} attempts.`);
        currentUtterance++;
        speakNextUtterance();
      }
    };

    window.speechSynthesis.speak(speech);
  };

  speakNextUtterance();

  // Return a function to cancel the speech
  return () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };
};
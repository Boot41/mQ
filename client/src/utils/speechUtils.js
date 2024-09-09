export const speakText = (text, isVoiceBotActive, setIsSpeaking, stopRecording, handleSpeechEnd) => {
  if (isVoiceBotActive && 'speechSynthesis' in window) {
    console.log('Speaking text:', text);
    const utterances = text.match(/.{1,200}(?:\s|$)/g);
    const voices = speechSynthesis.getVoices();
    
    const selectedVoice = voices.find(voice => voice.name === 'Google US English') || voices[0];
    console.log('Selected voice:', selectedVoice.name);

    speechSynthesis.cancel();

    utterances.forEach((chunk, index) => {
      const speech = new SpeechSynthesisUtterance(chunk);
      speech.voice = selectedVoice;
      speech.rate = 1;
      speech.pitch = 1;
      speech.volume = 1;
      speech.onstart = () => {
        console.log('Speech started:', chunk);
        setIsSpeaking(true);
        stopRecording();
      };
      speech.onend = () => {
        console.log('Speech ended:', chunk);
        if (index === utterances.length - 1) {
          handleSpeechEnd();
        }
      };
      speech.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
      };
      speechSynthesis.speak(speech);
    });
  } else {
    console.log('Speech synthesis not supported or voice bot not active');
  }
};

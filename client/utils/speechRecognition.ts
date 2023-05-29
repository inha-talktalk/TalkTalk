import { useEffect, useState } from 'react';

export function useSpeech(lang?: string) {
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null);
  const [value, setValue] = useState<string>('');
  const [isListening, setListening] = useState<boolean>(false);

  useEffect(() => {
    if (!window || !(window.SpeechRecognition || window.webkitSpeechRecognition)) return;
    const recog = window.SpeechRecognition || window.webkitSpeechRecognition;
    setSpeechRecognition(new recog());
  }, []);

  useEffect(() => {
    if (!speechRecognition) return;

    speechRecognition.interimResults = false;
    speechRecognition.lang = lang || 'en-US';
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1000;

    speechRecognition.addEventListener('result', (e) => {
      let interimTranscript = '';
      for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
        let transcript = e.results[i][0].transcript;
        interimTranscript += transcript;
      }
      setValue((value) => value + interimTranscript);
    });
  }, [lang, speechRecognition]);

  const start = () => {
    setListening(true);
    speechRecognition?.start();
  };

  const stop = () => {
    setListening(false);
    speechRecognition?.stop();
  };

  const resetValue = () => {
    setValue('');
  };

  return {
    value,
    start,
    stop,
    resetValue,
    isListening,
  };
}

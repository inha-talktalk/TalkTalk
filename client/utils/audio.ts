import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function useAudio(url: string) {
  const [playing, setPlaying] = useState<boolean>(false);

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const toggle = () => setPlaying(!playing);
  const startPlaying = () => setPlaying(true);
  const stopPlaying = () => setPlaying(false);

  useEffect(() => {
    audio?.pause();
    stopPlaying();
  }, [url, audio]);

  useEffect(() => {
    if (!url) return;

    setAudio(new Audio(url));
  }, [url]);

  useEffect(() => {
    if (!audio) return;

    (async () => {
      try {
        await (playing ? audio.play() : audio.pause());
      } catch (e) {
        toast.error('음성을 재생할 수 없습니다.');
      }
    })();
  }, [audio, playing]);

  useEffect(() => {
    if (!audio) return;

    audio.addEventListener('ended', () => {
      stopPlaying();
    });

    return () => {
      audio.removeEventListener('ended', stopPlaying);
    };
  }, [audio]);

  return {
    toggle,
    startPlaying,
    stopPlaying,
  };
}

import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

export default function useRecord() {
  const [permission, setPermission] = useState(false);
  const stream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const mimeType = 'audio/webm';

  const startRecord = async () => {
    try {
      stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });

      setPermission(true);
    } catch (err) {
      toast.error('마이크 권한을 가져오지 못했습니다.');
      return;
    }

    const media = new MediaRecorder(stream.current, { mimeType });

    mediaRecorder.current = media;
    mediaRecorder.current.start();
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') return;
      if (event.data.size === 0) return;
      audioChunks.current = [...audioChunks.current, event.data];
    };
  };

  const stopRecord = async (fileName: string): Promise<File> => {
    const stopPromise: Promise<File> = new Promise((resolve) => {
      if (!mediaRecorder.current) return;
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: mimeType });

        const file = new File([audioBlob], fileName);
        resolve(file);
      };
    });

    mediaRecorder.current?.stop();

    stream.current?.getTracks().forEach((track) => {
      track.stop();
      track.enabled = false;
    });

    mediaRecorder.current = null;
    return await stopPromise;
  };

  return { permission, startRecord, stopRecord };
}

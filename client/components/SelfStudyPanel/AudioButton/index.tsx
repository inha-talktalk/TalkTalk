import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import useAudio from '@/utils/audio';
import { HiSpeakerWave } from 'react-icons/hi2';

interface AudioButtonProps {
  url: string;
  disabled: boolean;
}

export default function AudioButton({ url, disabled }: AudioButtonProps) {
  const { theme } = useGlobalTheme();
  const [toggle] = useAudio(url);

  return (
    <>
      <HiSpeakerWave
        size={36}
        color={theme.secondary}
        onClick={() => {
          if (!disabled) toggle();
        }}
      />
    </>
  );
}

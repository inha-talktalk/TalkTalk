import { useState } from 'react';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { AiFillPlayCircle } from 'react-icons/ai';
import ChatBubble from '@/components/ChatBubble';
import { style } from '../style';
import ChatInputBar from '@/components/ChatInputBar';
import useAudio from '@/utils/audio';

interface SelfStudyPanelReadDoneProps {
  script: SelfStudyScriptResponse | null;
  answers: SelfStudyReadAnswer[];
}

export default function SelfStudyPanelReadDone({ script, answers }: SelfStudyPanelReadDoneProps) {
  const { theme } = useGlobalTheme();
  const [chatValue, setChatValue] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  const { startPlaying, stopPlaying } = useAudio(url);

  if (!script) return <></>;

  return (
    <div css={style.container}>
      <div css={style.bubbleContainer}>
        {Array(script?.scripts.length)
          .fill(0)
          .map((_, idx) => (
            <>
              <div className="left">
                <ChatBubble
                  position={'left'}
                  value={script.scripts[idx].text}
                  onClick={() => {
                    stopPlaying();
                    setUrl(script.scripts[idx].mp3Uri);
                    setTimeout(() => {
                      startPlaying();
                    }, 1);
                  }}
                />
              </div>
              <div className="right">
                <ChatBubble
                  position={'right'}
                  value={answers[idx].text}
                  onClick={() => {
                    stopPlaying();
                    setUrl(answers[idx].mp3Uri);
                    setTimeout(() => {
                      startPlaying();
                    }, 1);
                  }}
                />
              </div>
            </>
          ))}
      </div>
      <div css={style.chatInputContainer}>
        <ChatInputBar value={chatValue} onSend={() => {}} onChange={setChatValue} disabled>
          <AiFillPlayCircle size={36} color={theme.secondary} />
        </ChatInputBar>
      </div>
    </div>
  );
}

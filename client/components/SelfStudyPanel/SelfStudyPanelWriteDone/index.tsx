import { useState } from 'react';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { AiFillPlayCircle } from 'react-icons/ai';
import ChatBubble from '@/components/ChatBubble';
import { style } from '../style';
import ChatInputBar from '@/components/ChatInputBar';

interface SelfStudyPanelWriteDoneProps {
  script: SelfStudyScriptResponse | null;
  answers: SelfStudyWriteAnswer;
}

export default function SelfStudyPanelWriteDone({ script, answers }: SelfStudyPanelWriteDoneProps) {
  const { theme } = useGlobalTheme();
  const [chatValue, setChatValue] = useState<string>('');

  if (!script) return <></>;

  return (
    <div css={style.container}>
      <div css={style.bubbleContainer}>
        {Array(script?.scripts.length)
          .fill(0)
          .map((_, idx) => (
            <>
              <div className="left">
                <ChatBubble position={'left'} value={script.scripts[idx].text} />
              </div>
              <div className="right">
                <ChatBubble position={'right'} value={answers[idx]} />
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

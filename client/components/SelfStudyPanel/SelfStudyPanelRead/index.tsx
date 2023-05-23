import { useState } from 'react';
import { RiRecordCircleFill } from 'react-icons/ri';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import ChatBubble from '@/components/ChatBubble';
import { style } from '../style';
import ChatInputBar from '@/components/ChatInputBar';

interface SelfStudyPanelReadProps {
  script: SelfStudyScriptResponse | null;
}

export default function SelfStudyPanelRead({ script }: SelfStudyPanelReadProps) {
  const { theme } = useGlobalTheme();
  const [chatValue, setChatValue] = useState<string>('');

  return (
    <div css={style.container}>
      <div css={style.bubbleContainer}>
        <div className="left">
          <ChatBubble position={'left'} value={'Hey! Long time no see, how have you been?'} />
        </div>
        <div className="right">
          <ChatBubble position={'right'} value={'Hey! Long time no see, how have you been?'} />
        </div>
        <div className="left">
          <ChatBubble
            position={'left'}
            value={`Hey, yeah it's been ages! I've been good, thanks for asking. How about you?`}
          />
        </div>
        <div className="right">
          <ChatBubble
            position={'right'}
            value={`Hey, yeah it's been ages! I've been good, thanks for asking. How about you?`}
          />
        </div>
        <div className="left">
          <ChatBubble
            position={'left'}
            value={`Hey, yeah it's been ages! I've been good, thanks for asking. How about you?`}
          />
        </div>
        <div className="right">
          <ChatBubble
            position={'right'}
            value={`Hey, yeah it's been ages! I've been good, thanks for asking. How about you?`}
          />
        </div>
      </div>
      <div css={style.chatInputContainer}>
        <ChatInputBar value={chatValue} onSend={() => {}} onChange={setChatValue}>
          <RiRecordCircleFill size={36} color={theme.secondary} />
        </ChatInputBar>
      </div>
    </div>
  );
}

import { useState } from 'react';
import ChatInputBar from '../ChatInputBar';
import { RiRecordCircleFill } from 'react-icons/ri';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import ChatBubble from '../ChatBubble';
import { AiFillPlayCircle } from 'react-icons/ai';
import { style } from './style';
import AudioButton from './AudioButton';

interface SelfStudyPanelProps {
  type: 'read' | 'write' | 'readDone' | 'writeDone';
}

export default function SelfStudyPanel({ type }: SelfStudyPanelProps) {
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
        <ChatInputBar
          value={chatValue}
          onSend={() => {}}
          onChange={setChatValue}
          disabled={type === 'read' || type === 'write' ? false : true}
        >
          {type === 'read' && <RiRecordCircleFill size={36} color={theme.secondary} />}
          {type === 'write' && (
            <AudioButton url="https://inha-talktalk.s3.ap-northeast-2.amazonaws.com/clova/dialog/1684473628578" />
          )}
          {(type === 'readDone' || type === 'writeDone') && (
            <AiFillPlayCircle size={36} color={theme.secondary} />
          )}
        </ChatInputBar>
      </div>
    </div>
  );
}

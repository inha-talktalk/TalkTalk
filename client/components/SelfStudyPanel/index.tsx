import { useState } from 'react';
import ChatInputBar from '../ChatInputBar';
import { RiRecordCircleFill } from 'react-icons/ri';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import ChatBubble from '../ChatBubble';
import { css } from '@emotion/react';

export default function SelfStudyPanel() {
  const { theme } = useGlobalTheme();
  const [chatValue, setChatValue] = useState<string>('');

  const style = {
    container: css`
      width: 70%;
      height: 820px;
      border: 1px solid ${theme.gray};
      border-radius: 10px;
      margin: 15px;
      padding: 15px;
      position: relative;
    `,
    bubbleContainer: css`
      height: 90%;
      overflow: auto;
      margin-bottom: 15px;
      padding-bottom: 10px;

      & > div {
        margin: 0;
        padding: 10px;
      }

      & > div.right {
        text-align: right;
        & > div {
          text-align: left;
        }
      }
    `,
    chatInputContainer: css`
      & > div {
        position: relative;
        left: 50%;
        transform: translate(-50%);
      }
    `,
  };

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

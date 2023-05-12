import { useState } from 'react';
import ChatInputBar from '../ChatInputBar';
import ChatSlot from './ChatSlot';
import Divider from './Divider';
import { style } from './style';

export default function GroupStudyChat() {
  const [text, setText] = useState<string>('');

  return (
    <div css={style.container}>
      <div css={style.chatContainer}>
        <Divider date={new Date()} />
        <ChatSlot tmp={'chat'} />
        <ChatSlot tmp={'chat'} />
        <ChatSlot tmp={'chat'} />
        <ChatSlot tmp={'share'} />
      </div>
      <div css={style.inputBarContainer}>
        <ChatInputBar value={text} onSend={() => {}} onChange={setText} />
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import ChatInputBar from '../ChatInputBar';
import ChatSlot from './ChatSlot';
import { style } from './style';
import InfiniteScroll from 'react-infinite-scroll-component';
import { css } from '@emotion/react';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import Divider from './Divider';
import { useRecoilValue } from 'recoil';
import { selectedChannelState } from '@/states/groupStudy';

export default function GroupStudyChat() {
  const [text, setText] = useState<string>('');
  const [chatList, setChatList] = useState<string[]>([]);
  const selectedChannel = useRecoilValue(selectedChannelState);

  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchMore = () => {
    setTimeout(() => {
      if (scrollRef && scrollRef.current) {
        scrollRef.current.scrollTo({ top: -scrollRef.current.scrollHeight, behavior: 'smooth' });
      }
    }, 0);
    setTimeout(() => {
      setChatList((list) => [...list, '1', '2', '3', '4', '5']);
    }, 1000);
  };

  useEffect(() => {
    setChatList((list) => [...list, '1', '2', '3', '4', '5', '6', '7']);
  }, []);

  return (
    <div css={style.container}>
      <div css={style.chatContainer} id="scrollDiv" ref={scrollRef}>
        <InfiniteScroll
          next={fetchMore}
          hasMore={chatList.length < 20}
          loader={<Loader />}
          dataLength={chatList.length}
          scrollableTarget="scrollDiv"
          inverse
          style={{
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
          endMessage={<EndMessage />}
        >
          {chatList.map((_, idx) => (
            <ChatSlot tmp={selectedChannel} key={idx} />
          ))}
        </InfiniteScroll>
      </div>
      <div css={style.inputBarContainer}>
        <ChatInputBar value={text} onSend={() => {}} onChange={setText} />
      </div>
    </div>
  );
}

function Loader() {
  const { theme } = useGlobalTheme();

  return (
    <div
      css={css`
        padding: 15px 10px;
        text-align: center;
        color: ${theme.secondaryDark};
      `}
    >
      <span>이전 데이터를 가져오고 있습니다.</span>
    </div>
  );
}

function EndMessage() {
  const { theme } = useGlobalTheme();

  return (
    <div
      css={css`
        padding: 15px 10px;
        text-align: center;
        color: ${theme.secondaryDark};
      `}
    >
      <span
        css={css`
          font-size: 30px;
          font-weight: bold;
        `}
      >
        그룹 스터디에 오신 것을 환영합니다.
      </span>
      <p
        css={css`
          font-size: 14px;
        `}
      >
        이 그룹 스터디가 시작된 곳이에요
      </p>
      <Divider date={new Date()} />
    </div>
  );
}

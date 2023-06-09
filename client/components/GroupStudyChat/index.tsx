import { useCallback, useEffect, useRef, useState } from 'react';
import ChatInputBar from '../ChatInputBar';
import ChatSlot from './ChatSlot';
import { style } from './style';
import InfiniteScroll from 'react-infinite-scroll-component';
import { css } from '@emotion/react';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import Divider from './Divider';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  generalChatListState,
  selectedChannelState,
  shareChatListState,
} from '@/states/groupStudy';
import { getGeneralChatList, getShareChatList, postGeneralChat } from '@/utils/api';
import { useRouter } from 'next/router';

export default function GroupStudyChat() {
  const [text, setText] = useState<string>('');
  const [groupId, setGroupId] = useState<string>('');
  const selectedChannel = useRecoilValue(selectedChannelState);
  const [generalChatList, setGeneralChatList] = useRecoilState(generalChatListState);
  const [isGeneralChatHasMore, setGeneralChatHasMore] = useState<boolean>(true);
  const [shareChatList, setShareChatList] = useRecoilState(shareChatListState);
  const [isShareChatHasMore, setShareChatHasMore] = useState<boolean>(true);

  const router = useRouter();

  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchMore = useCallback(async () => {
    setTimeout(() => {
      if (scrollRef && scrollRef.current) {
        scrollRef.current.scrollTo({ top: -scrollRef.current.scrollHeight, behavior: 'smooth' });
      }
    }, 0);

    if (selectedChannel === 'general') {
      const generalChatListResponse = await getGeneralChatList(
        groupId,
        10,
        undefined,
        generalChatList[generalChatList.length - 1].id,
      );

      setGeneralChatHasMore(!generalChatListResponse.isFinished);
      setGeneralChatList((list) => [...list, ...generalChatListResponse.generalChatList.reverse()]);
    } else {
      const shareChatListResponse = await getShareChatList(
        groupId,
        10,
        undefined,
        shareChatList[shareChatList.length - 1].id,
      );

      setShareChatHasMore(!shareChatListResponse.finished);
      setShareChatList((list) => [...list, ...shareChatListResponse.selfStudyList.reverse()]);
    }
  }, [
    generalChatList,
    groupId,
    selectedChannel,
    setGeneralChatList,
    setShareChatList,
    shareChatList,
  ]);

  const updateRecentChat = useCallback(
    async (lastId?: string) => {
      if (selectedChannel === 'general') {
        const response = await getGeneralChatList(groupId, 10, lastId ?? generalChatList[0]?.id);
        setGeneralChatList((list) => [...response.generalChatList.reverse(), ...list]);
        if (!response.isFinished) await updateRecentChat(response.generalChatList[0].id);
      } else {
        const response = await getShareChatList(groupId, 10, lastId ?? shareChatList[0]?.id);
        setShareChatList((list) => [...response.selfStudyList.reverse(), ...list]);
        if (!response.finished) await updateRecentChat(response.selfStudyList[0].id);
      }
    },
    [
      generalChatList,
      groupId,
      selectedChannel,
      setGeneralChatList,
      setShareChatList,
      shareChatList,
    ],
  );

  useEffect(() => {
    if (!router.isReady) return;

    const groupId = router.query.groupId;

    if (!groupId || typeof groupId !== 'string') return;

    setGroupId(groupId);
  }, [router.isReady, router.query.groupId]);

  // get first general chat when group id changed
  useEffect(() => {
    const minCount = Math.trunc(window.innerHeight / 60);
    getGeneralChatList(groupId, minCount).then((res) =>
      setGeneralChatList(res.generalChatList.reverse()),
    );
  }, [groupId, setGeneralChatList]);

  // get first general chat when group id changed
  useEffect(() => {
    const minCount = Math.trunc(window.innerHeight / 130);
    getShareChatList(groupId, minCount).then((res) =>
      setShareChatList(res.selfStudyList.reverse()),
    );
  }, [groupId, setGeneralChatList, setShareChatList]);

  // set interval for new chat
  useEffect(() => {
    const id = setInterval(() => {
      updateRecentChat();
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [updateRecentChat]);

  return (
    <div css={style.container}>
      <div css={style.chatContainer} id="scrollDiv" ref={scrollRef}>
        <InfiniteScroll
          next={fetchMore}
          hasMore={selectedChannel === 'general' ? isGeneralChatHasMore : isShareChatHasMore}
          loader={<Loader />}
          dataLength={selectedChannel === 'general' ? generalChatList.length : shareChatList.length}
          scrollableTarget="scrollDiv"
          inverse
          style={{
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
          endMessage={<EndMessage />}
        >
          {selectedChannel === 'general' && generalChatList.length === 0 && <EmptyMessage />}
          {selectedChannel === 'general' &&
            generalChatList.map((chat, idx) => (
              <ChatSlot channel={selectedChannel} key={idx} chat={chat} />
            ))}

          {selectedChannel === 'share' && shareChatList.length === 0 && <EmptyMessage />}
          {selectedChannel === 'share' &&
            shareChatList.map((chat, idx) => (
              <ChatSlot channel={selectedChannel} key={idx} chat={chat} />
            ))}
        </InfiniteScroll>
      </div>
      <div css={style.inputBarContainer}>
        <ChatInputBar
          value={text}
          onSend={async () => {
            await postGeneralChat(groupId, text);
            setText('');
          }}
          onChange={setText}
        />
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

function EmptyMessage() {
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
        채팅을 시작해보세요.
      </p>
      <Divider date={new Date()} />
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

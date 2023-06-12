import Image from 'next/image';
import { style } from './style';
import { DEAFULT_PLACEHOLDER_GRAY } from '@/utils/image';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { css } from '@emotion/react';
import React from 'react';
import { Channels } from '@/states/groupStudy';
import { getFullDateString } from '@/utils/date';
import { getTimeDiffToString } from '@/utils/date';
import { useRouter } from 'next/router';

interface ChatSlotProps {
  channel: Channels;
  chat: GeneralChat | ShareChat;
}

function ChatSlot({ channel, chat }: ChatSlotProps) {
  const name =
    channel === 'general' ? (chat as GeneralChat).senderName : (chat as ShareChat).userName;

  return (
    <div css={style.container}>
      <Image
        src={DEAFULT_PLACEHOLDER_GRAY}
        alt={'profileImage'}
        width={60}
        height={60}
        css={style.image}
      />
      <div css={style.right}>
        <span>{name}</span>
        <span>
          {getFullDateString(
            new Date(channel === 'general' ? chat.createdAt : (chat as ShareChat).sharedAt),
          )}
        </span>
        {channel === 'general' ? (
          <p>{(chat as GeneralChat).content.message}</p>
        ) : (
          <ShareCard chat={chat as ShareChat} />
        )}
      </div>
    </div>
  );
}

export default React.memo(ChatSlot);

function ShareCard({ chat }: { chat: ShareChat }) {
  const { theme } = useGlobalTheme();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/selfStudy/view/write?studyId=${chat.selfStudyId}`);
  };

  return (
    <div css={style.shareContainer} onClick={handleClick}>
      <div
        css={css`
          display: flex;
          align-items: center;
          margin-bottom: 5px;
          justify-content: space-between;
        `}
      >
        <span>{chat.selfStudyName}</span>
        <div css={style.tagContainer(theme.blueWhite)}>
          {chat.tags.map((tag, idx) => (
            <span key={idx}>{tag}</span>
          ))}
        </div>
      </div>
      <span css={[style.bottom, style.bottomFirst]}>
        스터디 일자: {getFullDateString(new Date(chat.createdAt))}
      </span>
      <span css={style.bottom}>
        스터디 시간: {getTimeDiffToString(new Date(chat.createdAt), new Date(chat.finishedAt))}
      </span>
    </div>
  );
}

import { css } from '@emotion/react';
import { style } from './style';
import { GiSpeaker } from 'react-icons/gi';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { voiceChannelUserListState } from '@/states/groupStudy';

export default function GroupStudyVoiceChannel() {
  const voiceChannelUserList = useRecoilValue(voiceChannelUserListState);

  return (
    <div css={style.container}>
      <p>음성 채널</p>
      <div css={style.select}>
        <p>
          <span>
            <GiSpeaker size={24} />
          </span>
          일반
        </p>
        <div css={style.userSlotContainer}>
          {voiceChannelUserList.map((user, idx) => (
            <VoiceUserSlot user={user} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface VoiceUserSlotProps {
  user: UserProfile;
}

function VoiceUserSlot({ user }: VoiceUserSlotProps) {
  return (
    <div
      css={css`
        display: flex;
        gap: 10px;
        align-items: center;
      `}
    >
      <Image
        src={user.profileIconUrl}
        alt={'userProfile'}
        height={24}
        width={24}
        css={css`
          border-radius: 50%;
        `}
      />
      <span
        css={css`
          font-size: 16px;
          color: black !important;
        `}
      >
        {user.userName}
      </span>
    </div>
  );
}

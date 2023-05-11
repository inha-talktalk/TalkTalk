import Image from 'next/image';
import { BsFillMicMuteFill, BsFillMicFill } from 'react-icons/bs';
import { IoSettingsSharp } from 'react-icons/io5';
import { IoMdHeadset } from 'react-icons/io';
import { css } from '@emotion/react';
import { style } from './style';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { useRecoilState } from 'recoil';
import { muteState } from '@/states/groupStudy';
import { BsFillTelephoneXFill } from 'react-icons/bs';

interface GroupStudySettingControllerProps {
  user: GroupStudyUserInfo;
}

export default function GroupStudySettingController({ user }: GroupStudySettingControllerProps) {
  const { theme } = useGlobalTheme();
  const [isMute, setMute] = useRecoilState(muteState);

  return (
    <div>
      <VoiceChannelController />
      <div css={style.container(theme.darkerGray)}>
        <div css={style.left}>
          <div css={style.image(user.isOnline, theme.gray)}>
            <Image
              src={user.profileIconUrl}
              alt={'me'}
              width={50}
              height={50}
              css={css`
                border-radius: 50%;
                pointer-events: none;
              `}
            />
            <span></span>
          </div>
          <div css={style.name(theme.secondaryDark)}>
            <p>{user.userName}</p>
            <p>{user.isOwner ? '스터디장' : '스터디원'}</p>
          </div>
        </div>
        <div css={style.right}>
          <IoSettingsSharp size={28} />
          {isMute ? (
            <BsFillMicMuteFill size={28} onClick={() => setMute(false)} />
          ) : (
            <BsFillMicFill size={28} onClick={() => setMute(true)} />
          )}
          <IoMdHeadset size={28} />
        </div>
      </div>
    </div>
  );
}

function VoiceChannelController() {
  return (
    <div css={style.voiceChannelContainer}>
      <span>음성 연결됨</span>
      <BsFillTelephoneXFill
        size={24}
        css={css`
          color: #626262;
        `}
      />
    </div>
  );
}

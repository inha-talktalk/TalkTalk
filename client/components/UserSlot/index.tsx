import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { css } from '@emotion/react';
import Image from 'next/image';

interface UserSlotProps {
  user: GroupStudyUserInfo;
}

export default function UserSlot({ user }: UserSlotProps) {
  const { theme } = useGlobalTheme();
  const style = {
    container: css`
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      gap: 15px;
      border-radius: 10px;
      margin: 10px 0;
      padding: 5px;
      box-sizing: border-box;
      user-select: none;

      &:hover {
        box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.1);
      }
    `,
    leftContainer: css`
      position: relative;
      height: 50px;
      width: 50px;
    `,
    image: css`
      border-radius: 50%;
      pointer-events: none;
    `,
    onlineSpan: (isOwner: boolean) => css`
      position: absolute;
      bottom: 0;
      right: 0;
      display: inline-block;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      background-color: ${isOwner ? '#00d008' : theme.darkerGray};
    `,
    name: css`
      font-size: 16px;
    `,
    role: css`
      font-size: 14px;
      color: #8e8e8e;
    `,
  };

  return (
    <div css={style.container}>
      <div css={style.leftContainer}>
        <Image
          src={user.profileIconUrl}
          alt={'userImage'}
          width={50}
          height={50}
          css={style.image}
        />
        <span css={style.onlineSpan(user.isOwner)}></span>
      </div>
      <span css={style.name}>{user.userName}</span>
      <span css={style.role}>{user.isOwner ? '스터디장' : '스터디원'}</span>
    </div>
  );
}

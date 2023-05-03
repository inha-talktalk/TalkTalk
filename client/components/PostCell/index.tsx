import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import Button from '../Button';
import { style } from './style';
import { useRouter } from 'next/router';
import { MouseEventHandler } from 'react';

interface PostCellProps {
  group: GroupStudy;
  owner: UserProfile;
  isLast: boolean;
}

export default function PostCell({ group, owner, isLast }: PostCellProps) {
  const { theme } = useGlobalTheme();
  const router = useRouter();

  const handleContainerClick: MouseEventHandler<HTMLDivElement> = () => {
    router.push(`/postView/${group.groupId}`);
  };

  return (
    <div css={style.container(isLast, theme.gray)} onClick={handleContainerClick}>
      <div css={style.top}>
        <Button
          backgroundColor={group.isFinished ? theme.darkerGray : theme.secondary}
          value={group.isFinished ? '모집완료' : '모집중'}
          width={'72px'}
          height={'27px'}
          fontSize={'14px'}
        />
        <span css={style.title}>{group.groupName}</span>
      </div>
      <p>{group.introduction}</p>
      <div css={style.tagContainer(theme.blueWhite)}>
        {group.tags.map((tagName, index) => (
          <span key={index}>{tagName}</span>
        ))}
      </div>
      <div css={style.bottom(theme.secondaryDark)}>
        <p>{owner.nickName} · 1일 전</p>
        <p>조회수 230</p>
      </div>
    </div>
  );
}

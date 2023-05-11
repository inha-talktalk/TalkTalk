import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { style } from './style';
import React from 'react';

interface StudyCellProps {
  selfStudy: SelfStudy;
  owner: UserProfile;
  isLast: boolean;
  onClick?: VoidFunction;
}

function StudyCell({ selfStudy, owner, isLast, onClick }: StudyCellProps) {
  const { theme } = useGlobalTheme();

  return (
    <div css={style.container(isLast, theme.gray)} onClick={onClick}>
      <div css={style.top}>
        <span css={style.title}>{selfStudy.selfStudyName}</span>
      </div>
      <p css={style.content}>
        {selfStudy.script.reduce((acc, cur) => {
          if (acc.length > 150) return acc;
          return `${acc}${cur}`;
        }, '')}
      </p>
      <div css={style.tagContainer(theme.blueWhite)}>
        {selfStudy.tags.map((tagName, index) => (
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

export default React.memo(StudyCell);

import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { style } from './style';

interface StudyCellProps {
  selfStudy: SelfStudy;
  owner: UserProfile;
  isLast: boolean;
}

export default function StudyCell({ selfStudy, owner, isLast }: StudyCellProps) {
  const { theme } = useGlobalTheme();

  return (
    <div css={style.container(isLast, theme.gray)}>
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

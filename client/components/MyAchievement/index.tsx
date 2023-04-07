import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { css } from '@emotion/react';

interface MyAchievementProps {
  title: string;
  count: number;
  string?: string;
}

export default function MyAchievement({ title, count, string }: MyAchievementProps) {
  const { theme } = useGlobalTheme();
  const style = {
    container: css`
      background-color: ${theme.gray};
      border-radius: 10px;
      height: 120px;
      width: 211px;
      position: relative;
    `,
    inner: css`
      font-weight: 500;
      position: relative;
      left: 0;
      top: 50%;
      padding: 0 20px;
      transform: translate(0, -50%);

      & > p {
        font-size: 16px;
        color: ${theme.secondary};
        margin: 0;
        font-weight: 500;
      }

      & > span {
        font-size: 32px;
        font-weight: 500;
        margin-right: 3px;
      }
    `,
  };

  return (
    <div css={style.container}>
      <div css={style.inner}>
        <p>{title}</p>
        <br />
        <span>{count}</span>
        {string ?? '개'}
      </div>
    </div>
  );
}

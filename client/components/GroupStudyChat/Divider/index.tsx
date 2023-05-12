import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { getDateString } from '@/utils/date';
import { css } from '@emotion/react';

interface DividerProps {
  date: Date;
}

export default function Divider({ date }: DividerProps) {
  const { theme } = useGlobalTheme();

  return (
    <div
      css={css`
        padding: 5px 10px;
      `}
    >
      <div
        css={css`
          width: 100%;
          display: flex;
        `}
      >
        <div
          css={css`
            width: 100%;
            height: 1px;
            background-color: ${theme.gray};
            margin: auto;
          `}
        ></div>
        <span
          css={css`
            margin: 0 10px;
            color: ${theme.secondaryDark};
          `}
        >
          {getDateString(date)}
        </span>
        <div
          css={css`
            width: 100%;
            height: 1px;
            background-color: ${theme.gray};
            margin: auto;
          `}
        ></div>
      </div>
    </div>
  );
}

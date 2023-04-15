import { css } from '@emotion/react';

interface TitleInputBarProps {
  width: number;
  height: number;
  placeholder?: string;
}

export default function TitleInputBar({ width, height, placeholder }: TitleInputBarProps) {
  const style = css`
    font: inherit;
    font-size: 36px;
    font-weight: bold;
    border: none;
    appearance: none;
    outline: none;
    width: ${width}px;
    height: ${height}px;
  `;

  return <input css={style} type="text" placeholder={placeholder} />;
}

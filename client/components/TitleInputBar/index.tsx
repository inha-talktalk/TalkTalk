import { css } from '@emotion/react';
import { ChangeEventHandler } from 'react';

interface TitleInputBarProps {
  width: number;
  height: number;
  placeholder?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function TitleInputBar({
  width,
  height,
  placeholder,
  value,
  onChange,
}: TitleInputBarProps) {
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

  return (
    <input css={style} type="text" placeholder={placeholder} value={value} onChange={onChange} />
  );
}

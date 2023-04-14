import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { css } from '@emotion/react';
import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from 'react';

interface InputBarProps {
  width: number;
  height?: number;
  placeholder?: string;
  fontSize?: number;

  text: string;
  setText: Dispatch<SetStateAction<string>>;
  onEnterClick?: () => void;
}

export default function InputBar({
  text,
  setText,
  onEnterClick,
  width,
  height,
  placeholder,
  fontSize,
}: InputBarProps) {
  const { theme } = useGlobalTheme();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnterClick !== undefined) {
      onEnterClick();
    }
  };

  const style = {
    container: css`
      display: flex;
      border: 1px solid ${theme.gray};
      width: ${width}px;
      height: ${height ?? 40}px;
      border-radius: 10px;
      justify-content: space-around;
      align-items: center;
    `,
    input: css`
      width: ${width - 20}px;
      height: ${height ? height - 4 : 36}px;
      border: none;
      appearance: none;
      outline: none;
      font-size: ${fontSize ?? 16}px;
    `,
  };

  return (
    <div css={style.container}>
      <input
        css={style.input}
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
    </div>
  );
}

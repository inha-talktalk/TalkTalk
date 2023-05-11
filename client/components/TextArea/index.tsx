import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { css } from '@emotion/react';
import React from 'react';
import { Dispatch, SetStateAction } from 'react';

interface TextAreaProps {
  height: number;
  width: number;
  placeholder?: string;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}

function TextArea({ height, width, placeholder, text, setText }: TextAreaProps) {
  const { theme } = useGlobalTheme();
  const style = {
    textarea: css`
      resize: none;
      height: ${height}px;
      width: ${width}px;
      border: 1px solid ${theme.gray};
      border-radius: 15px;
      font: inherit;
      font-size: 20px;
      padding: 10px;
    `,
  };

  return (
    <textarea
      css={style.textarea}
      placeholder={placeholder}
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}

export default React.memo(TextArea);

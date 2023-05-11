import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { css, SerializedStyles } from '@emotion/react';
import React from 'react';

interface ButtonProps {
  value: string;
  backgroundColor?: string;
  color?: string;
  width: string;
  height: string;
  fontSize: string;
  innerCss?: SerializedStyles;
  onClick?: () => void;
}

function Button({
  value,
  backgroundColor,
  color,
  width,
  height,
  fontSize,
  innerCss,
  onClick,
}: ButtonProps) {
  const { theme } = useGlobalTheme();

  const style = (width: string, height: string) => css`
    border-radius: 10px;
    width: ${width};
    height: ${height};
    background-color: ${backgroundColor ?? theme.primary};
    color: ${color ?? theme.offWhite};
    text-align: center;
    line-height: ${height};
    user-select: none;
    cursor: pointer;
    font-size: ${fontSize};

    &:active {
      filter: brightness(0.9);
    }
  `;

  return (
    <div css={[style(width, height), innerCss]} onClick={onClick}>
      {value}
    </div>
  );
}

export default React.memo(Button);

import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { css } from '@emotion/react';

interface ChatBubbleProps {
  position: 'left' | 'right';
  value: string;
}

export default function ChatBubble({ position, value }: ChatBubbleProps) {
  const { theme } = useGlobalTheme();
  const style = {
    container: css`
      display: inline-block;
      padding: 10px;
      max-width: 40%;
      min-width: 5px;
      min-height: 14px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      font-size: 14px;
      word-wrap: break-word;
    `,
    right: css`
      background-color: ${theme.secondary};
      color: white;
      border-radius: 20px 20px 0 20px;
    `,
    left: css`
      background-color: ${theme.gray};
      color: ${theme.secondaryDark};
      border-radius: 0px 20px 20px 20px;
    `,
  };

  return <div css={[style.container, style[position]]}>{value}</div>;
}

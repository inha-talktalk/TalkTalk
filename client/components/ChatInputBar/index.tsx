import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { css } from '@emotion/react';
import { ChangeEvent, Dispatch, KeyboardEventHandler, ReactNode, SetStateAction } from 'react';
import { IoSendSharp } from 'react-icons/io5';

interface ChatInputBarProps {
  placeholder?: string;
  value: string;
  onChange?: Dispatch<SetStateAction<string>>;
  onSend: VoidFunction;
  children?: ReactNode;
  onLeftButtonClick?: VoidFunction;
  disabled?: boolean;
}

export default function ChatInputBar({
  value,
  placeholder,
  onChange,
  onSend,
  children,
  onLeftButtonClick,
  disabled,
}: ChatInputBarProps) {
  const { theme } = useGlobalTheme();

  const style = {
    container: css`
      display: flex;
      padding: 10px;
      width: 100%;
      height: 60px;
      box-sizing: border-box;
      border: 1px solid ${theme.gray};
      border-radius: 30px;
      justify-content: space-between;
      align-items: center;
    `,
    leftContainer: css`
      display: flex;
      align-items: center;

      & > svg:active {
        filter: brightness(0.8);
      }
    `,
    input: css`
      outline: none;
      border: none;
      width: 100%;
      font-size: 16px;
      line-height: 40px;
      height: 40px;
      padding: 0 10px;

      &:disabled {
        background-color: inherit;
      }
    `,
    button: css`
      width: 40px;
      height: 40px;
      border-radius: 50%;

      &:active {
        filter: brightness(0.8);
      }
    `,
    sendImage: css`
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      onSend?.();
    }
  };

  return (
    <div css={style.container}>
      <div onClick={onLeftButtonClick} css={style.leftContainer}>
        {children}
      </div>
      <input
        type="text"
        value={value}
        placeholder={disabled ? '비활성화되어있습니다.' : placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
        css={style.input}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <div css={style.button}>
        <IoSendSharp size={24} fill={theme.primary} css={style.sendImage} />
      </div>
    </div>
  );
}

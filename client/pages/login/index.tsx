import LoginButton from '@/components/LoginButton';
import { css } from '@emotion/react';

export default function LoginPage() {
  const style = css`
    padding-top: 400px;
    width: 1000px;
    margin: auto;
    text-align: center;
  `;

  return (
    <div css={style}>
      <LoginButton />
    </div>
  );
}

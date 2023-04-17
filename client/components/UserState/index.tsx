import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import Button from '../Button';

const style = {
  container: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 240px;
    justify-content: space-around;
  `,
  a: css`
    text-decoration-line: none;
    color: #747474;
    font-size: 20px;
  `,
};

interface UserStateProps {
  isLoggedIn: boolean;
}

export default function UserState({ isLoggedIn }: UserStateProps) {
  const signUpUrl = '';
  const myPageUrl = '';
  const router = useRouter();

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  };

  return (
    <div css={style.container}>
      <a href={isLoggedIn ? myPageUrl : signUpUrl} css={style.a}>
        {isLoggedIn ? '마이페이지' : '회원가입'}
      </a>
      <Button
        value={isLoggedIn ? '로그아웃' : '로그인'}
        width={'93px'}
        height={'48px'}
        fontSize={'20px'}
        onClick={handleButtonClick}
      />
    </div>
  );
}

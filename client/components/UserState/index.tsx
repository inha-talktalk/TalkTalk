import { jwtState } from '@/states/login';
import { css } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
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
  const signUpUrl = '/login';
  const myPageUrl = '/myPage';
  const router = useRouter();
  const [_, setJwt] = useRecoilState(jwtState);

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      // TODO: 추후에 로그아웃 API 호출하도록 수정 예정
      setJwt('');
      window.localStorage.removeItem('jwt');
    }
  };

  return (
    <div css={style.container}>
      <Link href={isLoggedIn ? myPageUrl : signUpUrl} css={style.a}>
        {isLoggedIn ? '마이페이지' : '회원가입'}
      </Link>
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

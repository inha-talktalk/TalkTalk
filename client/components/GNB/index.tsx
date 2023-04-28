import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import Logo from '../Logo';
import UserState from '../UserState';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { style } from './style';
import { useRecoilValue } from 'recoil';
import { jwtState } from '@/states/login';
import { apiAxiosInstance } from '@/utils/api';

const navLinks = [
  {
    pathname: '/selfStudy',
    value: '셀프 스터디',
  },
  {
    pathname: '/studyGroup',
    value: '스터디',
  },
  {
    pathname: '/findStudyGroup',
    value: '스터디 그룹 찾기',
  },
  {
    pathname: '/createStudyGroup',
    value: '스터디 만들기',
  },
];

export default function GNB() {
  const { theme } = useGlobalTheme();
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState<string>('');
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const jwt = useRecoilValue(jwtState);

  useEffect(() => {
    if (router.isReady) {
      setCurrentPath(router.pathname);
    }
  }, [router.isReady, router.pathname]);

  // to know login status
  useEffect(() => {
    setLoginStatus(jwt !== '');

    apiAxiosInstance.defaults.headers.common['x-access-token'] = jwt;
  }, [jwt]);

  return (
    <div css={style.container(theme.offWhite)}>
      <div css={style.left}>
        <Logo />
        <div>
          {navLinks.map((link, idx) => (
            <span
              css={style.span(currentPath === link.pathname ? theme.primary : theme.black)}
              key={idx}
              onClick={() => router.push(link.pathname)}
            >
              {link.value}
            </span>
          ))}
        </div>
      </div>
      <UserState isLoggedIn={loginStatus} />
    </div>
  );
}

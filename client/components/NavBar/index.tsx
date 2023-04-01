import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import Logo from '../Logo';
import UserState from '../UserState';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { style } from './style';

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

export default function NavBar() {
  const { theme } = useGlobalTheme();
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState<string>('');

  useEffect(() => {
    if (router.isReady) {
      setCurrentPath(router.pathname);
    }
  }, [router.isReady, router.pathname]);

  return (
    <div css={style.container}>
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
      <UserState isLoggedIn={false} />
    </div>
  );
}

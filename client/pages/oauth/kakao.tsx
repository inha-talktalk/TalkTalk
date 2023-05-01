import { jwtState } from '@/states/login';
import { apiAxiosInstance, login } from '@/utils/api';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function KakaoOauthPage() {
  const router = useRouter();
  const [_, setJwt] = useRecoilState(jwtState);

  // to get query from router
  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.code instanceof Array || !router.query.code) return;

    const code: string = router.query.code ?? '';

    (async () => {
      try {
        const result = await login(code);

        setJwt(result.token);
        globalThis.window.localStorage.setItem('jwt', result.token);
        apiAxiosInstance.defaults.headers.common['x-access-token'] = result.token;
      } catch (e) {
        alert('로그인 실패');
      }

      router.replace('/');
    })();
  }, [router, setJwt]);

  return <></>;
}

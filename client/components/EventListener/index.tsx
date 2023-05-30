import { jwtState } from '@/states/login';
import { apiAxiosInstance } from '@/utils/api';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

interface EventListenerProps {
  children: ReactNode;
}

export default function EventListener({ children }: EventListenerProps) {
  const [, setJwt] = useRecoilState(jwtState);
  const router = useRouter();

  useEffect(() => {
    if (!globalThis) return;

    const handler = () => {
      localStorage.removeItem('jwt');
      delete apiAxiosInstance.defaults.headers.common['x-access-token'];
      setJwt('');
      router.push('/');
      toast.info('로그인이 만료되었습니다.', { toastId: 'jwt' });
    };

    window.addEventListener('jwtExpired', handler);

    return () => window.removeEventListener('jwtExpired', handler);
  }, [router, setJwt]);

  return <>{children}</>;
}

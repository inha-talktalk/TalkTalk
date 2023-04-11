import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Logo() {
  const router = useRouter();

  return (
    <Image
      onClick={() => {
        if (router.isReady) {
          router.push('/');
        }
      }}
      src="/logo.svg"
      alt="Logo"
      width={184}
      height={57}
    />
  );
}

import Image from 'next/image';

export default function LoginButton() {
  const makeKakaoRequestUrl = () => {
    const requestUrl = process.env.NEXT_PUBLIC_KAKAO_OAUTH_URL ?? '';
    const redirectUrl = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL ?? '';
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID ?? '';
    const responseType = process.env.NEXT_PUBLIC_KAKAO_RESPONSE_TYPE ?? '';

    const result = new URL(requestUrl);
    result.searchParams.append('client_id', clientId);
    result.searchParams.append('redirect_uri', redirectUrl);
    result.searchParams.append('response_type', responseType);

    return result.href;
  };

  const handleClick = () => {
    document.location.href = makeKakaoRequestUrl();
  };

  return (
    <Image src="/kakaoLogin.png" height={45} width={300} alt="kakaoLogin" onClick={handleClick} />
  );
}

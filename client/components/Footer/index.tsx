import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import Image from 'next/image';
import footerStyle from './style';

export default function Footer() {
  const { theme } = useGlobalTheme();
  const style = footerStyle(theme);

  return (
    <div css={style.container}>
      <div css={style.top}>
        <div css={style.logo}>TalkTalk</div>
        <div css={style.col}>
          <p css={style.titleCol}>서비스</p>
          <a css={style.contentCol}>로그인 / 회원가입</a>
          <a css={style.contentCol}>셀프 스터디</a>
          <a css={style.contentCol}>스터디 그룹 찾기</a>
          <a css={style.contentCol}>스터디 만들기</a>
        </div>
        <div css={style.col}>
          <p css={style.titleCol}>고객센터</p>
          <a css={style.contentCol}>찾아 오시는 길</a>
        </div>
        <div css={style.col}>
          <p css={style.titleCol}>팀 소개</p>
          <a css={style.contentCol}>README</a>
        </div>
        <div css={style.col}>
          <p css={style.titleCol}>서비스 소개</p>
          <a css={style.contentCol}>API 문서</a>
        </div>
        <div css={style.col}>
          <p css={style.titleCol}>이용 방법</p>
          <a css={style.contentCol}>이용 안내</a>
        </div>
      </div>
      <div css={style.bottom}>
        <div css={style.spacer}></div>
        <p css={style.copyright}>copyright 2023, TalkTalk All rights Reserved.</p>
        <div css={style.spacer}>
          <Image css={style.image} src={'/github.svg'} height={55} width={55} alt="Github" />
          <Image css={style.image} src={'/youtube.svg'} height={55} width={55} alt="Youtube" />
        </div>
      </div>
    </div>
  );
}

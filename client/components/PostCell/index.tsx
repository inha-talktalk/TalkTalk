import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import Button from '../Button';
import { style } from './style';

export default function PostCell() {
  const { theme } = useGlobalTheme();

  return (
    <div css={style.container}>
      <div css={style.top}>
        <Button
          backgroundColor={theme.secondary}
          value={'모집중'}
          width={'72px'}
          height={'27px'}
          fontSize={'14px'}
        />
        <span css={style.title}>토익 스피킹</span>
      </div>
      <p>
        안녕하세요. 개인적으로 네명정도 토익 스피킹 스터디 진행하실 분 모십니다. 매주 2일 스터디를
        진행할 예정이며 현재 2명 모집되었습니다. 앞으로 두...
      </p>
      <div css={style.tagContainer(theme.blueWhite)}>
        <span># 토익 스피킹</span>
        <span># 4명</span>
        <span># 매주 2일</span>
      </div>
      <div css={style.bottom(theme.secondaryDark)}>
        <p>홍길동 · 1일 전</p>
        <p>조회수 230</p>
      </div>
    </div>
  );
}

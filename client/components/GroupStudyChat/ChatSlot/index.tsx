import Image from 'next/image';
import { style } from './style';
import { DEAFULT_PLACEHOLDER_GRAY } from '@/utils/image';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { css } from '@emotion/react';
import React from 'react';
import { Channels } from '@/states/groupStudy';

interface ChatSlotProps {
  // TODO: API 결정이후 변경 예정
  tmp: Channels;
}

function ChatSlot({ tmp }: ChatSlotProps) {
  return (
    <div css={style.container}>
      <Image
        src={DEAFULT_PLACEHOLDER_GRAY}
        alt={'profileImage'}
        width={60}
        height={60}
        css={style.image}
      />
      <div css={style.right}>
        <span>김아랑</span>
        <span>2023.03.22 오후 03:23</span>
        {tmp === 'general' ? <p>안녕하세요! 반갑습니다.</p> : <ShareCard />}
      </div>
    </div>
  );
}

export default React.memo(ChatSlot);

function ShareCard() {
  const { theme } = useGlobalTheme();

  return (
    <div css={style.shareContainer}>
      <div
        css={css`
          display: flex;
          align-items: center;
          margin-bottom: 5px;
          justify-content: space-between;
        `}
      >
        <span>미국 여행 따라잡기</span>
        <div css={style.tagContainer(theme.blueWhite)}>
          <span># 영어</span>
          <span># 여행</span>
          <span># 회화</span>
        </div>
      </div>
      <span css={[style.bottom, style.bottomFirst]}>스터디 일자: 2023.03.27</span>
      <span css={style.bottom}>스터디 시간: 08분 13초</span>
    </div>
  );
}

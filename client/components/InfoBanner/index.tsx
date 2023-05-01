import { css } from '@emotion/react';

export default function InfoBanner() {
  const style = {
    container: css`
      box-sizing: border-box;
      width: 300px;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      margin: 15px;
      padding: 15px;

      & > h1 {
        font-size: 24px;
      }

      & > h2 {
        font-size: 20px;
        font-weight: normal;
        margin: 0;
        padding: 10px 0;
      }
    `,
  };
  return (
    <div css={style.container}>
      <h1>기능 설명</h1>
      <h2>1. 녹음 버튼을 누릅니다.</h2>
      <h2>2. 화면에 표시된 내용을 보고 말합니다.</h2>
      <h2>3. 보내기 버튼을 눌러 전송합니다.</h2>
      <h2>4. 정답과 내가 말한 내용을 비교해봅니다.</h2>
      <h2>5. 모든 문장을 연습했으면 완료 버튼을 눌러 스터디를 종료합니다.</h2>
    </div>
  );
}

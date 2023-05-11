import { css } from '@emotion/react';

type status = 'read' | 'write' | 'readDone' | 'writeDone';
type textList = {
  // eslint-disable-next-line unused-imports/no-unused-vars
  [index in status]: string[];
};

interface InfoBannerProps {
  status: status;
}

export default function InfoBanner({ status }: InfoBannerProps) {
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
      {getTextList(status).map((text, idx) => (
        <h2 key={idx}>
          {idx + 1}. {text}
        </h2>
      ))}
    </div>
  );
}

function getTextList(type: status) {
  const textList: textList = {
    read: [
      '녹음 버튼을 누릅니다.',
      '화면에 표시된 내용을 보고 말합니다.',
      '보내기 버튼을 눌러 전송합니다.',
      '정답과 내가 말한 내용을 비교해봅니다.',
      '모든 문장을 연습했으면 완료 버튼을 눌러 스터디를 종료합니다.',
    ],
    write: [
      '스피커 버튼을 누릅니다.',
      '들은 내용을 입력칸에 작성합니다.',
      '보내기 버튼을 눌러 전송합니다.',
      '정답과 내가 쓴 내용을 비교해봅니다.',
      '모든 문장을 연습했으면 완료 버튼을 눌러 스터디를 종료합니다.',
    ],
    readDone: [
      '좌측 말풍선을 눌러 정확한 발음을 들어봅니다.',
      '우측 말풍선을 눌러 내 발음을 확인합니다.',
      '입력 창 옆 재생 버튼을 누르면 전체 문장을 들을 수 있습니다.',
      '내가 공부한 내용을 공유하고 싶을 땐 공유 버튼을 눌러 공유가 가능합니다.',
    ],
    writeDone: [
      '좌측 말풍선과 우측 말풍선의 내용을 비교해봅니다.',
      '입력 창 옆 재생 버튼을 누르면 전체 문장을 들을 수 있습니다.',
      '내가 공부한 내용을 공유하고 싶을 땐 공유 버튼을 눌러 공유가 가능합니다.',
    ],
  };

  return textList[type];
}

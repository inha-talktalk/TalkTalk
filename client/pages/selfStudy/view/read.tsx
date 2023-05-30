import InfoBanner from '@/components/InfoBanner';
import SelfStudyController from '@/components/SelfStudyController';
import SelfStudyPanel from '@/components/SelfStudyPanel';
import { css } from '@emotion/react';
import Head from 'next/head';

export default function ViewSelfStudyRead() {
  const style = {
    container: css`
      display: flex;
      width: 100%;
      justify-content: space-around;
    `,
  };
  return (
    <>
      <Head>
        <title>TalkTalk - 셀프 스터디 읽기</title>
      </Head>
      <div css={style.container}>
        <SelfStudyPanel type={'readDone'} script={null} />
        <div>
          <SelfStudyController
            type={'read'}
            title={'title'}
            tags={['#tag1', '#tag2']}
            status="done"
            time={new Date()}
            script={null}
          />
          <InfoBanner status={'readDone'} />
        </div>
      </div>
    </>
  );
}

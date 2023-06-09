import InfoBanner from '@/components/InfoBanner';
import SelfStudyController from '@/components/SelfStudyController';
import SelfStudyPanel from '@/components/SelfStudyPanel';
import { getSelfStudy } from '@/utils/api';
import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ViewSelfStudyWrite() {
  const style = {
    container: css`
      display: flex;
      width: 100%;
      justify-content: space-around;
    `,
  };

  const [selfStudy, setSelfStuty] = useState<SelfStudyResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const selfStudyId = router.query.studyId;

    if (!selfStudyId || typeof selfStudyId !== 'string') return;

    (async () => {
      const selfStudyResponse = await getSelfStudy(selfStudyId);
      setSelfStuty(selfStudyResponse);
    })();
  }, [router]);

  if (!selfStudy) return <></>;

  return (
    <>
      <Head>
        <title>TalkTalk - 셀프 스터디 쓰기</title>
      </Head>
      <div css={style.container}>
        <SelfStudyPanel
          type={'writeDone'}
          script={{
            scriptId: '',
            scripts: selfStudy.scripts,
          }}
          answers={selfStudy.answers}
        />
        <div>
          <SelfStudyController
            type={'write'}
            title={selfStudy.selfStudyName}
            tags={selfStudy.tags}
            status="done"
            time={new Date(selfStudy.createdAt)}
            script={null}
          />
          <InfoBanner status={'writeDone'} />
        </div>
      </div>
    </>
  );
}

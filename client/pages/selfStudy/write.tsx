import InfoBanner from '@/components/InfoBanner';
import SelfStudyController from '@/components/SelfStudyController';
import SelfStudyPanel from '@/components/SelfStudyPanel';
import { selfStudy } from '@/states/selfStudy';
import { getSelfStudyScripts } from '@/utils/api';
import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function SelfStudyWritePage() {
  const style = {
    container: css`
      display: flex;
      width: 100%;
      justify-content: space-around;
    `,
  };

  const [selfStudyData] = useRecoilState(selfStudy);
  const [script, setScript] = useState<SelfStudyScriptResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!selfStudyData) {
      router.replace('/selfStudy/create/write');
      return;
    }

    (async () => {
      setScript(await getSelfStudyScripts(selfStudyData.languageId, selfStudyData.scriptType));
    })();
  }, [selfStudyData, router]);

  return (
    <>
      <Head>
        <title>TalkTalk - 셀프 스터디 쓰기</title>
      </Head>
      {selfStudyData && (
        <div css={style.container}>
          <SelfStudyPanel type={'write'} script={script} />
          <div>
            <SelfStudyController
              type={'write'}
              title={selfStudyData.title}
              tags={selfStudyData.tags}
              time={new Date()}
              script={script}
            />
            <InfoBanner status={'write'} />
          </div>
        </div>
      )}
    </>
  );
}

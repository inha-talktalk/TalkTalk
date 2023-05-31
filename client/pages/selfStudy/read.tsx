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

export default function SelfStudyReadPage() {
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
      router.replace('/selfStudy/create/read');
      return;
    }

    (async () => {
      setScript(await getSelfStudyScripts(selfStudyData.languageId, selfStudyData.scriptType));
    })();
  }, [selfStudyData, router]);

  if (!selfStudyData) return <></>;

  return (
    <>
      <Head>
        <title>TalkTalk - 셀프 스터디 읽기</title>
      </Head>
      <div css={style.container}>
        <SelfStudyPanel type={'read'} script={script} />
        <div>
          <SelfStudyController
            type={'read'}
            title={selfStudyData.title}
            tags={selfStudyData.tags}
            time={new Date()}
            script={script}
          />
          <InfoBanner status={'read'} />
        </div>
      </div>
    </>
  );
}

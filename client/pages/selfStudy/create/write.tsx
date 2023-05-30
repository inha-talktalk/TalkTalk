import CreateSelfStudy from '@/components/CreateSelfStudy';
import Head from 'next/head';

export default function CreateSelfStudyWritePage() {
  return (
    <>
      <Head>
        <title>TalkTalk - 셀프 스터디 생성</title>
      </Head>
      <CreateSelfStudy type="write" />
    </>
  );
}

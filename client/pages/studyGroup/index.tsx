import StudyCardList from '@/components/StudyCardList';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { getDoneStudy, getProgressStudy } from '@/utils/api';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

export default function StudyGroupPage() {
  const [progressStudyList, setProgressStudyList] = useState<MyStudy[]>([]);
  const [doneStudyList, setDoneStudyList] = useState<MyStudy[]>([]);

  const { theme } = useGlobalTheme();

  const style = {
    container: css`
      width: 1000px;
      margin: auto;
      padding-top: 30px;

      & h2 {
        font-weight: normal;
        font-size: 24px;
        color: ${theme.secondaryDark};
        margin: 0;
        padding-bottom: 4px;
        border-bottom: 1px solid ${theme.gray};
      }
    `,
    title: css`
      font-weight: normal;
      font-size: 30px;
      margin-bottom: 30px;
    `,
  };

  // to get study list
  useEffect(() => {
    (async () => {
      setProgressStudyList(await getProgressStudy());
    })();

    (async () => {
      setDoneStudyList(await getDoneStudy());
    })();
  }, []);

  return (
    <div css={style.container}>
      <h1 css={style.title}>그룹 스터디</h1>
      <h2>진행중인 스터디</h2>
      <StudyCardList studyList={progressStudyList} />
      <h2>완료된 스터디</h2>
      <StudyCardList studyList={doneStudyList} />
    </div>
  );
}

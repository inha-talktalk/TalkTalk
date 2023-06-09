import { useEffect, useState } from 'react';
import StudyCard from '../StudyCard';
import { style } from './style';
import { getProgressStudy, postSelfStudyShare } from '@/utils/api';

interface SelfStudySharePanelProps {
  selfStudyId: string;
  onButtonClick?: VoidFunction;
}

export default function SelfStudySharePanel({
  selfStudyId,
  onButtonClick,
}: SelfStudySharePanelProps) {
  const [studyList, setStudyList] = useState<MyStudy[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setStudyList(await getProgressStudy());
      setLoading(false);
    })();
  }, []);

  return (
    <div css={style.container}>
      <p css={style.title}>셀프 스터디 공유</p>
      <p css={style.subTitle}>셀프 스터디를 공유할 스터디를 선택하세요!</p>
      <div css={style.cardContainer}>
        {isLoading ? (
          <>
            <div css={style.placeholder}></div>
            <div css={style.placeholder}></div>
            <div css={style.placeholder}></div>
          </>
        ) : studyList.length === 0 ? (
          <>
            <div></div>
            <p css={style.noneStudyP}>스터디가 없습니다.</p>
          </>
        ) : (
          studyList.map((study, idx) => (
            <StudyCard
              id={study.groupId}
              title={study.groupName}
              tags={study.tags}
              key={idx}
              buttonText="공유하기"
              onButtonClick={() => {
                postSelfStudyShare(selfStudyId, study.groupId);
                onButtonClick?.();
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

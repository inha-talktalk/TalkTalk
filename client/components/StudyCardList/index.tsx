import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import StudyCard from '../StudyCard';
import { css } from '@emotion/react';
import Arrow from './Arrow';

interface StudyCardListProps {
  studyList: GroupStudy[];
  isRegistered?: boolean;
}

export default function StudyCardList({ studyList, isRegistered }: StudyCardListProps) {
  return (
    <div
      css={css`
        padding: 15px 0;
      `}
    >
      <ScrollMenu LeftArrow={<Arrow direction="left" />} RightArrow={<Arrow direction="right" />}>
        {studyList.map((study, idx) => (
          <StudyCard
            id={study.groupId}
            title={study.groupName}
            tags={study.tags}
            isRegistered={isRegistered}
            // TODO: 추후에 idx를 studyId로 바꿔야 함.
            key={idx}
          />
        ))}
      </ScrollMenu>
    </div>
  );
}

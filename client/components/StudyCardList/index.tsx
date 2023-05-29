import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import StudyCard from '../StudyCard';
import { css } from '@emotion/react';
import Arrow from './Arrow';
import React from 'react';

interface StudyCardListProps {
  studyList: MyStudy[];
  isRegistered?: boolean;
}

function StudyCardList({ studyList, isRegistered }: StudyCardListProps) {
  return (
    <div
      css={css`
        padding: 15px 0;
      `}
    >
      <ScrollMenu LeftArrow={<Arrow direction="left" />} RightArrow={<Arrow direction="right" />}>
        {studyList.length === 0 ? (
          <div
            css={css`
              height: 128px;
              width: 920px;
              text-align: center;
              position: relative;
              & > p {
                position: relative;
                top: 50%;
                left: 0;
                transform: translate(0, -50%);
                margin: 0;
              }
            `}
          >
            <p>스터디가 없습니다.</p>
          </div>
        ) : (
          studyList.map((study) => (
            <StudyCard
              id={study.groupId}
              title={study.groupName}
              tags={study.tags}
              isRegistered={isRegistered}
              key={study.groupId}
            />
          ))
        )}
      </ScrollMenu>
    </div>
  );
}

export default React.memo(StudyCardList);

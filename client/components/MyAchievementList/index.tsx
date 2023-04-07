import { getDateDiff } from '@/utils/date';
import MyAchievement from '../MyAchievement';
import { css } from '@emotion/react';

interface MyAcheivementListProps {
  achievement: UserAcheivement | null;
}

const style = css`
  display: flex;
  width: 1000px;
  justify-content: space-between;
`;

export default function MyAchievementList({ achievement }: MyAcheivementListProps) {
  return (
    <div css={style}>
      <MyAchievement title={'참여중인 스터디'} count={achievement?.teamMateCount ?? 0} />
      <MyAchievement title={'정복 중인 언어'} count={achievement?.studyLanguageCount ?? 0} />
      <MyAchievement
        title={'공부를 시작한지'}
        count={
          achievement ? getDateDiff(new Date(), new Date(Date.parse(achievement.joinTime))) : 0
        }
        string="일"
      />
      <MyAchievement
        title={'완료한 셀프 스터디 수'}
        count={achievement?.completedSelfStudyCount ?? 0}
      />
    </div>
  );
}

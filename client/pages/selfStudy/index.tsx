import MyAchievementList from '@/components/MyAchievementList';
import StudyBanner from '@/components/StudyBanner';
import StudyCell from '@/components/StudyCell';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { getSelfStudyList, getSelfStudy, getUserAchievement, getUserProfile } from '@/utils/api';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const style = {
  container: css`
    width: 1000px;
    margin: auto;
    padding: 30px 0 40px 0;
  `,
  title: (color: string) => css`
    font-weight: normal;
    font-size: 30px;

    & > span {
      color: ${color};
    }
  `,
};

export default function SelfStudy() {
  const [acheivement, setAcheivement] = useState<UserAcheivement | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selfStudyIdList, setSelfStudyIdList] = useState<SelfStudyList | null>(null);
  const [selfStudyList, setSelfStudyList] = useState<SelfStudy[]>([]);
  const { theme } = useGlobalTheme();

  // to get user achievement
  useEffect(() => {
    (async () => {
      setAcheivement(await getUserAchievement('test'));
    })();
  }, []);

  // to get user profile
  useEffect(() => {
    (async () => {
      setUser(await getUserProfile('test'));
    })();
  }, []);

  // to get selfStudyIdList
  useEffect(() => {
    (async () => {
      setSelfStudyIdList(await getSelfStudyList());
    })();
  }, []);

  // to get selfStudyList
  useEffect(() => {
    (async () => {
      if (selfStudyIdList) {
        const selfStudyListPromises = selfStudyIdList.selfStudyIds.map((selfStudyId) =>
          getSelfStudy(selfStudyId),
        );

        setSelfStudyList(await Promise.all(selfStudyListPromises));
      }
    })();
  }, [selfStudyIdList]);

  return (
    <div css={style.container}>
      <h1 css={style.title(theme.secondary)}>
        <span>{user?.userName ?? ''}님</span>의 성장 여정이예요.
      </h1>
      <MyAchievementList achievement={acheivement} />
      <br />
      <br />
      <StudyBanner />
      <br />
      <br />
      <h2>최근 스터디</h2>
      {user &&
        selfStudyList.slice(0, 5).map((selfStudy, idx) => (
          <StudyCell selfStudy={selfStudy} owner={user} isLast={false} key={idx} /> // TODO: change idx to selfStudyId
        ))}
    </div>
  );
}

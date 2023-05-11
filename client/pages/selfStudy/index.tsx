import MyAchievementList from '@/components/MyAchievementList';
import StudyBanner from '@/components/StudyBanner';
import StudyCell from '@/components/StudyCell';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { getSelfStudyList, getSelfStudy, getUserAchievement, getMyProfile } from '@/utils/api';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  // to get user achievement
  useEffect(() => {
    (async () => {
      setAcheivement(await getUserAchievement());
    })();
  }, []);

  // to get user profile
  useEffect(() => {
    (async () => {
      setUser(await getMyProfile());
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
        selfStudyList.slice(0, 5).map((selfStudy, idx, arr) => (
          <StudyCell
            selfStudy={selfStudy}
            owner={user}
            isLast={idx === arr.length - 1}
            key={idx}
            onClick={() => {
              router.push(`/selfStudy/view/write`);
            }}
          /> // TODO: change idx to selfStudyId
        ))}
    </div>
  );
}

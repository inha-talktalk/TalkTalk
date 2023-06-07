import MyAchievementList from '@/components/MyAchievementList';
import StudyBanner from '@/components/StudyBanner';
import StudyCell from '@/components/StudyCell';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { getSelfStudyList, getSelfStudy, getUserAchievement, getMyProfile } from '@/utils/api';
import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

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
  pageNumberContainer: css`
    padding: 15px 0 15px 0;
    display: flex;
    justify-content: center;

    user-select: none;
    cursor: pointer;

    & > span {
      width: 20px;
      text-align: center;
    }

    & > span.current-page {
      font-weight: bold;
    }
  `,
};

export default function SelfStudy() {
  const [acheivement, setAcheivement] = useState<UserAcheivement | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selfStudyList, setSelfStudyList] = useState<SelfStudy[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPageNum, setTotalPageNum] = useState<number>(1);
  const [startPageNum, setStartPageNum] = useState<number>(1);
  const [endPageNum, setEndPageNum] = useState<number>(1);

  const { theme } = useGlobalTheme();
  const router = useRouter();

  const handlePageNumClick = (pageNum: number) => {
    if (!router.isReady) return;

    router.push({
      pathname: '/selfStudy',
      query: {
        pageNum,
      },
    });
  };

  // to get pageNum from router
  useEffect(() => {
    if (!router.isReady) return;

    const pageNum = router.query.pageNum;

    if (pageNum && !(pageNum instanceof Array) && !isNaN(+pageNum)) setPageNum(+pageNum);
  }, [router]);

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
      const selfStudyResponse = await getSelfStudyList(pageNum);
      setSelfStudyList(selfStudyResponse.selfStudyList);
      setTotalPageNum(selfStudyResponse.totalPage + 1);
    })();
  }, [pageNum]);

  // to set page num
  useEffect(() => {
    setStartPageNum(Math.max(1, pageNum - 5));
    setEndPageNum(Math.min(totalPageNum, pageNum + 5));
  }, [pageNum, totalPageNum]);

  return (
    <>
      <Head>
        <title>TalkTalk - 셀프 스터디</title>
      </Head>
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
          selfStudyList.map((selfStudy, idx, arr) => (
            <StudyCell
              selfStudy={selfStudy}
              owner={user}
              isLast={idx === arr.length - 1}
              key={idx}
              onClick={() => {
                router.push({
                  pathname: `/selfStudy/view/${selfStudy.selfStudyType}`,
                  query: {
                    studyId: selfStudy.id,
                  },
                });
              }}
            />
          ))}
      </div>
      <div css={style.pageNumberContainer}>
        ·
        {Array(endPageNum - startPageNum + 1)
          .fill(0)
          .map((_, idx) => idx + startPageNum)
          .map((val) => (
            <React.Fragment key={val}>
              <span
                className={val === pageNum ? 'current-page' : ''}
                onClick={() => {
                  handlePageNumClick(val);
                }}
              >
                {val}
              </span>
              ·
            </React.Fragment>
          ))}
      </div>
    </>
  );
}

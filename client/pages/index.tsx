import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import PostCell from '@/components/PostCell';
import { getGroupStudyList, getUserProfile } from '@/utils/api';
import { css } from '@emotion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
export default function Home() {
  const style = {
    nav: css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
    `,
    mainImage: css`
      margin-top: 75px;
      width: 100%;
      height: 500px;
      position: relative;
      user-select: none;
    `,
    groupStudyListContainer: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 50px 0 150px 0;

      & > p {
        font-size: 30px;
        width: 1010px;
      }
    `,
  };

  const [groupStudyList, setGroupStudyList] = useState<GroupStudy[]>([]);
  const [groupStudyOwnerList, setGroupStudyOwnerList] = useState<UserProfile[]>([]);

  // to GET Group Study List
  useEffect(() => {
    (async () => {
      try {
        const list = await getGroupStudyList();
        setGroupStudyList(list);
      } catch (e) {
        if (e instanceof Error) {
          console.error(`Error by getGroupStudyList() on index\n${e.message}`);
        }
      }
    })();
  }, []);

  // to GET Group Study Owner Profile
  useEffect(() => {
    (async () => {
      try {
        const getUserPromises = groupStudyList.map((groupStudy) =>
          getUserProfile(groupStudy.ownerId),
        );

        setGroupStudyOwnerList(await Promise.all(getUserPromises));
      } catch (e) {
        if (e instanceof Error) {
          console.error(`Error by getGroupStudyList() on index\n${e.message}`);
        }
      }
    })();
  }, [groupStudyList]);

  return (
    <>
      <div css={style.nav}>
        <NavBar />
      </div>
      <div css={style.mainImage}>
        <Image src={'/main.png'} alt={'main'} fill={true} />
      </div>
      <div css={style.groupStudyListContainer}>
        <p>최근 스터디 모집</p>
        {groupStudyList.length === groupStudyOwnerList.length &&
          Array(groupStudyList.length)
            .fill(0)
            .map((_, i) => i)
            .map((i) => (
              <PostCell
                group={groupStudyList[i]}
                owner={groupStudyOwnerList[i]}
                isLast={i === groupStudyList.length - 1}
                key={groupStudyList[i].groupId}
              />
            ))}
      </div>
      <Footer />
    </>
  );
}

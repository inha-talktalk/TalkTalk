import GroupStudyChat from '@/components/GroupStudyChat';
import GroupStudyController from '@/components/GroupStudyController';
import UserList from '@/components/UserList';
import { userListState } from '@/states/groupStudy';
import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const mockUserList: GroupStudyUserInfo[] = [
  {
    userName: 'name',
    nickName: 'nickname',
    profileIconUrl:
      'http://k.kakaocdn.net/dn/bag7SF/btrdFno9CHy/Z7U6DUv8OLZEniTp1Tveg1/img_640x640.jpg',

    isOnline: true,
    isOwner: true,
    email: 'dolphinlmg@naver.com',
  },
  {
    userName: 'name2',
    nickName: 'nickname2',
    profileIconUrl:
      'http://k.kakaocdn.net/dn/bag7SF/btrdFno9CHy/Z7U6DUv8OLZEniTp1Tveg1/img_640x640.jpg',

    isOnline: false,
    isOwner: false,
    email: 'dolphinlmg@naver.com',
  },
];

export default function GroupStudyPage() {
  const router = useRouter();
  const [_, setUserList] = useRecoilState(userListState);
  const [groupId, setGroupId] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    setGroupId(typeof router.query.groupId === 'string' ? router.query.groupId : null);
  }, [router]);

  useEffect(() => {
    setUserList(mockUserList);
  }, [setUserList]);

  return (
    <>
      <Head>
        <title>TalkTalk - 그룹 스터디</title>
      </Head>
      <div
        css={css`
          width: 100%;
          height: 100%;
          user-select: none;
          display: flex;
        `}
      >
        <div
          css={css`
            height: 100%;
            float: left;
          `}
        >
          <GroupStudyController groupId={groupId} />
        </div>
        <div
          css={css`
            width: 100%;
            height: 100%;
          `}
        >
          <GroupStudyChat />
        </div>
        <div
          css={css`
            height: 100%;
            float: right;
          `}
        >
          <UserList />
        </div>
      </div>
    </>
  );
}

import GroupStudyChat from '@/components/GroupStudyChat';
import GroupStudyController from '@/components/GroupStudyController';
import UserList from '@/components/UserList';
import { userListState } from '@/states/groupStudy';
import { css } from '@emotion/react';
import { useEffect } from 'react';
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
  const [_, setUserList] = useRecoilState(userListState);

  useEffect(() => {
    setUserList(mockUserList);
  }, [setUserList]);

  return (
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
        <GroupStudyController groupId={'test'} />
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
  );
}

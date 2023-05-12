import { atom } from 'recoil';

export const userListState = atom<GroupStudyUserInfo[]>({
  key: 'userList',
  default: [],
});

export type Channels = 'general' | 'share';

export const selectedChannelState = atom<Channels>({
  key: 'selectedChannel',
  default: 'general',
});

export const voiceChannelUserListState = atom<UserProfile[]>({
  key: 'voiceChannelUserList',
  default: [
    {
      userName: '이민규',
      profileIconUrl:
        'http://k.kakaocdn.net/dn/bag7SF/btrdFno9CHy/Z7U6DUv8OLZEniTp1Tveg1/img_640x640.jpg',
      nickName: '',
      email: '',
    },
  ],
});

export const muteState = atom<boolean>({
  key: 'isMute',
  default: false,
});

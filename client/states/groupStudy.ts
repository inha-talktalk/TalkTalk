import { atom } from 'recoil';

export const userListState = atom<GroupStudyUserInfo[]>({
  key: 'userList',
  default: [],
});

type Channels = 'general' | 'share';

export const selectedChannelState = atom<Channels>({
  key: 'selectedChannel',
  default: 'general',
});

export const voiceChannelUserListState = atom<UserProfile[]>({
  key: 'voiceChannelUserList',
  default: [],
});

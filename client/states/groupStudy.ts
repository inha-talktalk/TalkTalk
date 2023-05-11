import { atom } from 'recoil';

export const userListState = atom<GroupStudyUserInfo[]>({
  key: 'userList',
  default: [],
});

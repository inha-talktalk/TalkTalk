import { atom } from 'recoil';

export const jwtState = atom<string>({
  key: 'jwt',
  default: '',
});

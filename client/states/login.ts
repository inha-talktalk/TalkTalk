import { atom, selector } from 'recoil';

const jwt = atom<string | null>({
  key: 'jwtAtom',
  default: null,
});

export const jwtState = selector<string>({
  key: 'jwt',
  get: ({ get }) => {
    if (typeof window === 'undefined') return get(jwt) ?? '';
    return get(jwt) ?? window.localStorage.getItem('jwt') ?? '';
  },
  set: ({ set }, newValue) => {
    set(jwt, newValue);
  },
});

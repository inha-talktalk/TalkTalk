import { atom } from 'recoil';

interface SelfStudyState {
  title: string;
  tags: string[];
  languageId: string;
  scriptType: string;
}

export const selfStudy = atom<SelfStudyState | null>({
  key: 'selfStudy',
  default: null,
});

export const submitSelfStudy = atom<boolean>({
  key: 'selfStudySubmit',
  default: false,
});

export const selfStudyStarted = atom<boolean>({
  key: 'isSelfStudyStarted',
  default: false,
});

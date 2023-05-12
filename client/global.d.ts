/* eslint-disable unused-imports/no-unused-vars */
interface GroupStudy {
  state: 'ongoing' | 'done' | 'waiting' | undefined;
  groupId: string;
  languageId: string;
  groupName: string;
  groupPersonnel: number;
  tags: string[];
  introduction: string;
  groupDuration: Date | null;
  ownerId: string;
  isFinished: boolean;
  createdAt: Date;
}

interface GroupStudyPostResponse extends GroupStudy {
  groupDuration: string;
  createdAt: string;
}

type GroupStudyListResponse = GroupStudyPostResponse[];

interface UserProfile {
  userName: string;
  nickName: string;
  email: string;
  profileIconUrl: string;
}

type UserProfileResponse = UserProfile;

interface UserAcheivement {
  teamMateCount: number;
  studyLanguageCount: number;
  joinTime: string;
  completedSelfStudyCount: number;
}

type UserAcheivementResponse = UserAcheivement;

interface SelfStudy {
  userId: string;
  selfStudyName: string;
  selfStudyId: string;
  files: []; // TODO: 추후에 구현 예정
  duration: number;
  tags: string[];
  script: string[];
}

type SelfStudyResponse = SelfStudy;

interface SelfStudyList {
  selfStudyIds: string[];
}

type SelfStudyListResponse = SelfStudyList;

interface LoginResponse {
  token: string;
}

interface GroupStudySearchResponse {
  groupIds: string[];
  totalPage: number;
  currentPage: number;
}

interface Language {
  label: string;
  id: string;
}

type LanguageResponse = Language[];

interface CreateGroupStudyBody {
  languageId: string;
  groupName: string;
  tags: string[];
  introduction: string;
  groupPersonnel: number;
  groupDuration: string | null;
}

interface MyStudy {
  groupId: string;
  groupName: string;
  tags: string[];
}

type MyStudyResponse = MyStudy[];

interface GroupStudyUserInfo extends UserProfile {
  isOnline: boolean;
  isOwner: boolean;
}

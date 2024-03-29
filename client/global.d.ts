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
  groupDuration: string | null;
  createdAt: string;
}

type groupStudyResponse = GroupStudyPostResponse;

interface GroupStudyListResponse {
  groupStudyList: groupStudyResponse[];
  totalPage: number;
  currentPage: number;
}

type GroupStudySearchResponse = GroupStudyListResponse;

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
  id: string;
  userId: string;
  selfStudyType: string;
  selfStudyName: string;
  tags: string[];
  createdAt: string;
  finishedAt: string;
  script: SelfStudyScript[];
  answer: SelfStudyReadAnswer | SelfStudyWriteAnswer;
}

interface SelfStudyResponse {
  userId: string;
  selfStudyType: string;
  scriptType: string;
  selfStudyName: string;
  tags: string[];
  createdAt: string;
  finishedAt: string;
  scripts: SelfStudyScript[];
  answers: SelfStudyReadAnswer[] | SelfStudyWriteAnswer;
}

interface SelfStudyList {
  selfStudyIds: string[];
}

interface SelfStudyReadAnswer {
  text: string;
  mp3Uri: string;
}

type SelfStudyWriteAnswer = string[];

interface SelfStudyListResponse {
  selfStudyList: SelfStudy[];
  totalPage: number;
  currentPage: number;
}

interface LoginResponse {
  token: string;
}

interface Language {
  label: string;
  id: string;
  tts: string;
  stt: string;
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
  userId: string;
  isOnline: boolean;
  isOwner: boolean;
}

interface ScriptType {
  label: string;
  value: string;
}

type ScriptTypeResponse = ScriptType[];

interface SelfStudyScript {
  text: string;
  mp3Uri: string;
}

interface SelfStudyScriptResponse {
  scriptId: string;
  scripts: SelfStudyScript[];
}

interface SelfStudyStartResponse {
  selfStudyId: string;
}

interface GroupStudyWatingListResponse {
  groupId: string;
  waitingList: string[];
}

interface GeneralChat {
  id: string;
  groupId: string;
  senderId: string;
  senderName: string;
  profileImage: string;
  content: { message: string };
  createdAt: string;
}

interface GeneralChatListResponse {
  generalChatList: GeneralChat[];
  isFinished: boolean;
}

interface ShareChat {
  id: string;
  userName: string;
  profileImage: string;
  selfStudyId: string;
  selfStudyName: string;
  tags: string[];
  createdAt: string;
  sharedAt: string;
  finishedAt: string;
}

interface ShareChatListResponse {
  selfStudyList: ShareChat[];
  finished: boolean;
}

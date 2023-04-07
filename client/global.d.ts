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
}

type GroupStudyPostResponse = GroupStudy;
type GroupStudyListResponse = GroupStudy[];

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

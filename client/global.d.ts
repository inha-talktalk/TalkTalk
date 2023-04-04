/* eslint-disable unused-imports/no-unused-vars */
interface GroupStudy {
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

type GroupStudyPostResponse = GroupStudyPost;

interface UserProfile {
  userName: string;
  nickName: string;
  email: string;
  profileIconUrl: string;
}

type UserProfileResponse = UserProfile;

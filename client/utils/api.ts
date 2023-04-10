import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_PATH;

if (!BASE_URL) throw new Error('API_BASE_URL이 없습니다.');

export const apiAxiosInstance = axios.create({
  baseURL: BASE_URL,
});

async function call(url: string, functionName: string) {
  try {
    return (await apiAxiosInstance.get(url)).data;
  } catch (e) {
    if (e instanceof Error) {
      console.error(`API call error ${functionName}`);
    }
  }
}

export async function getUserProfile(userId: string): Promise<UserProfileResponse> {
  return await call(`/user/profile/${userId}`, 'getUserProfile');
}

export async function getGroupStudyList(): Promise<GroupStudyListResponse> {
  return await call('/group-study/list', 'getGroupStudyList');
}

export async function getUserAchievement(userId: string): Promise<UserAcheivementResponse> {
  return await call(`/user/achievement/${userId}`, 'getUserAchievement');
}

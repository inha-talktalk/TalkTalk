import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_PATH;

if (!BASE_URL) throw new Error('API_BASE_URL이 없습니다.');

export const apiAxiosInstance = axios.create({
  baseURL: BASE_URL,
});

async function get<T>(url: string, functionName: string): Promise<T> {
  try {
    return (await apiAxiosInstance.get(url)).data;
  } catch (e) {
    if (e instanceof Error) {
      console.error(`API call error ${functionName}`);
    }
    throw e;
  }
}

export async function getUserProfile(userId: string) {
  return await get<UserProfileResponse>(`/user/profile/${userId}`, 'getUserProfile');
}

export async function getGroupStudyList() {
  return await get<GroupStudyListResponse>('/group-study/list', 'getGroupStudyList');
}

export async function getUserAchievement(userId: string) {
  return await get<UserAcheivementResponse>(`/user/achievement/${userId}`, 'getUserAchievement');
}

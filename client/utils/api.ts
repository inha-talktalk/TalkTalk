import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_PATH;

if (!BASE_URL) throw new Error('API_BASE_URL이 없습니다.');

export const apiAxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export async function getUserProfile(userId: string) {
  return (await apiAxiosInstance.get(`/user/profile/${userId}`)).data;
}

export async function getGroupStudyList() {
  return (await apiAxiosInstance.get('/group-study/list')).data;
}

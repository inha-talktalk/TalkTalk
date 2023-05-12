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

async function post<T>(url: string, body: object, functionName: string): Promise<T> {
  try {
    return (await apiAxiosInstance.post(url, body)).data;
  } catch (e) {
    if (e instanceof Error) {
      console.error(`API call error ${functionName}`);
    }
    throw e;
  }
}

async function patch<T>(url: string, body: object, functionName: string): Promise<T> {
  try {
    return (await apiAxiosInstance.patch(url, body)).data;
  } catch (e) {
    if (e instanceof Error) {
      console.error(`API call error ${functionName}`);
    }
    throw e;
  }
}

export async function getMyProfile() {
  return await get<UserProfileResponse>(`/user/profile/self`, 'getMyProfile');
}

export async function getUserProfile(userId: string) {
  return await get<UserProfileResponse>(`/user/profile/${userId}`, 'getUserProfile');
}

export async function getGroupStudyList() {
  const groupStudyListResponse = await get<GroupStudyListResponse>(
    '/group-study/list',
    'getGroupStudyList',
  );

  return groupStudyListResponse.map((groupStudyResponse) => ({
    ...groupStudyResponse,
    groupDuration: new Date(groupStudyResponse.groupDuration),
    createdAt: new Date(groupStudyResponse.createdAt),
  }));
}

export async function getUserAchievement() {
  return await get<UserAcheivementResponse>(`/user/achieve`, 'getUserAchievement');
}

export async function getSelfStudyList() {
  return await get<SelfStudyListResponse>(`/self-study/list`, 'getSelfStudyList');
}

export async function getSelfStudy(selfStudyId: string) {
  return await get<SelfStudyResponse>(`/self-study/${selfStudyId}`, 'getSelfStudy');
}

export async function login(code: string) {
  return await post<LoginResponse>(`/oauth/kakao?code=${code}`, {}, 'login');
}

export async function getGroupStudySearch(keyword: string, page?: number) {
  return await get<GroupStudySearchResponse>(
    `/group-study?keyword=${keyword}${page ? `&page=${page}` : ''}`,
    'getGroupStudySearch',
  );
}

export async function getGroupStudyPost(groupStudyId: string) {
  const groupPostResponse = await get<GroupStudyPostResponse>(
    `/group-study/${groupStudyId}/post`,
    'getGroupStudyPost',
  );

  const groupPost: GroupStudy = {
    ...groupPostResponse,
    groupDuration: new Date(groupPostResponse.groupDuration),
    createdAt: new Date(groupPostResponse.createdAt),
  };

  return groupPost;
}

export async function patchMyProfile(userName: string, nickName: string) {
  await patch(
    `/user/profile`,
    {
      userName,
      nickName,
    },
    'patchMyProfile',
  );
}

export async function postUserProfileImage(formData: FormData) {
  await post(`/user/profile/img`, formData, 'postUserProfileImage');
}

export async function postApplyGroupStudy(groupId: string) {
  await post(`/group-study/apply?groupStudyId=${groupId}`, {}, 'postApplyGroupStudy');
}

export async function getLanguages() {
  return get<LanguageResponse>(`/language`, 'getLanguages');
}

export async function postGroupStudy(body: CreateGroupStudyBody) {
  await post(`/group-study`, body, 'postGroupStudy');
}

export async function getDoneStudy() {
  return get<MyStudyResponse>(`/user/study/done`, 'getDoneStudy');
}

export async function getProgressStudy() {
  return get<MyStudyResponse>(`/user/study/progress`, 'getDoneStudy');
}

export async function getApplyStudy() {
  return get<MyStudyResponse>(`/user/study/apply`, 'getDoneStudy');
}

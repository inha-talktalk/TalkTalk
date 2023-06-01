import Button from '@/components/Button';
import UserSlot from '@/components/UserSlot';
import { style } from './style';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userListState } from '@/states/groupStudy';
import { getUserProfile, getWatingList, postApproveUser, postDelegateUser } from '@/utils/api';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface OwnerSettingProps {
  user: GroupStudyUserInfo;
}

export default function OnwerSetting({ user }: OwnerSettingProps) {
  const { theme } = useGlobalTheme();
  const [isListFocused, setListFocused] = useState<boolean>(true);

  return (
    <>
      <div>
        <button
          css={style.tabButton(
            isListFocused ? theme.offWhite : theme.gray,
            theme.secondaryDark,
            true,
          )}
          onClick={() => setListFocused(true)}
        >
          신청 목록
        </button>
        <button
          css={style.tabButton(
            isListFocused ? theme.gray : theme.offWhite,
            theme.secondaryDark,
            false,
          )}
          onClick={() => setListFocused(false)}
        >
          위임
        </button>
      </div>
      <div css={style.container}>{isListFocused ? <UserApprove /> : <UserDelegation />}</div>
    </>
  );
}

function UserDelegation() {
  const userList = useRecoilValue(userListState);
  const router = useRouter();

  const handleButtonClick = async (userId: string) => {
    const groupStudyId = router.query.groupId;
    if (!groupStudyId || typeof groupStudyId !== 'string') return;

    try {
      await postDelegateUser(groupStudyId, userId);
    } catch (e) {
      toast.error('스터디 위임에 실패했습니다. 다시 시도해주세요');
    }
  };

  return (
    <>
      {userList.map((user) => (
        <div key={user.userId}>
          <UserSlot user={user} disableHover />
          <Button
            value={'위임'}
            width={'56px'}
            height={'31px'}
            fontSize={'14px'}
            onClick={() => handleButtonClick(user.userId)}
          />
        </div>
      ))}
      {userList.length === 0 && (
        <>
          <p css={style.p}>그룹 스터디에 스터디원이 없습니다.</p>
        </>
      )}
    </>
  );
}

function UserApprove() {
  const [applyUserList, setApplyUserList] = useState<GroupStudyUserInfo[]>([]);
  const router = useRouter();
  const handleButtonClick = async (userId: string) => {
    const groupStudyId = router.query.groupId;
    if (!groupStudyId || typeof groupStudyId !== 'string') return;
    try {
      await postApproveUser(groupStudyId, userId);
    } catch (e) {
      toast.error('가입 수락에 실패했습니다.');
    }
  };

  useEffect(() => {
    const groupStudyId = router.query.groupId;
    if (!groupStudyId || typeof groupStudyId !== 'string') return;

    (async () => {
      try {
        const userIdList = (await getWatingList(groupStudyId)).waitingList;
        // TODO: 추후에 API 완성되면 GroupStudyUserProfile로 수정 예정

        const userList = await Promise.all(
          userIdList.map(async (id) => {
            const user: GroupStudyUserInfo = {
              ...(await getUserProfile(id)),
              isOnline: false,
              isOwner: false,
              userId: id,
            };

            return user;
          }),
        );
        setApplyUserList(userList);
      } catch (e) {
        toast.error('가입 신청 리스트를 불러오는데 실패했습니다.');
      }
    })();
  }, [router.query.groupId]);

  return (
    <>
      {applyUserList.map((user) => (
        <div key={user.userId}>
          <UserSlot user={user} disableHover />
          <Button
            value={'위임'}
            width={'56px'}
            height={'31px'}
            fontSize={'14px'}
            onClick={() => handleButtonClick(user.userId)}
          />
        </div>
      ))}
      {applyUserList.length === 0 && (
        <>
          <p css={style.p}>그룹 스터디 가입 요청이 없습니다.</p>
        </>
      )}
    </>
  );
}

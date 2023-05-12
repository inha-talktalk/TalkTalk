import { userListState } from '@/states/groupStudy';
import { useRecoilValue } from 'recoil';
import { style } from './style';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import UserSlot from '../UserSlot';

export default function UserList() {
  const userList = useRecoilValue(userListState);
  const { theme } = useGlobalTheme();

  return (
    <div css={style.container(theme.offWhite)}>
      <p css={style.title(theme.secondaryDark)}>스터디원</p>
      <div>
        {userList.map((user, idx) => (
          <UserSlot user={user} key={idx} />
        ))}
      </div>
    </div>
  );
}

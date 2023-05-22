import Button from '@/components/Button';
import { style } from './style';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import UserSlot from '@/components/UserSlot';

export default function GroupStudySetting() {
  const { theme } = useGlobalTheme();

  const user = {
    userName: 'name',
    nickName: 'nickname',
    profileIconUrl:
      'http://k.kakaocdn.net/dn/bag7SF/btrdFno9CHy/Z7U6DUv8OLZEniTp1Tveg1/img_640x640.jpg',

    isOnline: true,
    isOwner: false,
    email: 'dolphinlmg@naver.com',
  };

  return (
    <div css={style.container(theme.offWhite)}>
      <div css={style.inner}>
        <div>
          <UserSlot user={user} disableHover />
          <Button value={'위임'} width={'56px'} height={'31px'} fontSize={'14px'} />
        </div>
        <div>
          <UserSlot user={user} disableHover />
          <Button value={'위임'} width={'56px'} height={'31px'} fontSize={'14px'} />
        </div>
        <div>
          <UserSlot user={user} disableHover />
          <Button value={'위임'} width={'56px'} height={'31px'} fontSize={'14px'} />
        </div>
        <div>
          <UserSlot user={user} disableHover />
          <Button value={'위임'} width={'56px'} height={'31px'} fontSize={'14px'} />
        </div>
      </div>

      <Button
        value={'탈퇴하기'}
        width={'100%'}
        height={'34px'}
        fontSize={'16px'}
        backgroundColor="#F56060"
      />
    </div>
  );
}

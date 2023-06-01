import Button from '@/components/Button';
import { style } from './style';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import OnwerSetting from './OwnerSetting';

export default function GroupStudySetting() {
  const { theme } = useGlobalTheme();

  const user = {
    userName: 'name',
    nickName: 'nickname',
    profileIconUrl:
      'http://k.kakaocdn.net/dn/bag7SF/btrdFno9CHy/Z7U6DUv8OLZEniTp1Tveg1/img_640x640.jpg',

    isOnline: true,
    isOwner: true,
    email: 'dolphinlmg@naver.com',
  };

  return (
    <div css={style.container(theme.offWhite)}>
      {user.isOwner && <OnwerSetting user={user} />}

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

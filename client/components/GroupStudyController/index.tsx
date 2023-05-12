import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { style } from './style';
import StudyInfo from './StudyInfo';
import { useEffect, useState } from 'react';
import { getGroupStudyPost } from '@/utils/api';
import GroupStudyChannel from './GroupStudyChannel';
import GroupStudyVoiceChannel from './GroupStudyVoiceChannel';
import GroupStudySettingController from './GroupStudySettingController';

interface GroupStudyControllerProps {
  groupId: string;
}

export default function GroupStudyController({ groupId }: GroupStudyControllerProps) {
  const { theme } = useGlobalTheme();
  const [group, setGroup] = useState<GroupStudy | null>(null);
  const user = {
    userName: 'name',
    nickName: 'nickname',
    profileIconUrl:
      'http://k.kakaocdn.net/dn/bag7SF/btrdFno9CHy/Z7U6DUv8OLZEniTp1Tveg1/img_640x640.jpg',

    isOnline: true,
    isOwner: true,
    email: 'dolphinlmg@naver.com',
  };

  useEffect(() => {
    (async () => {
      setGroup(await getGroupStudyPost(groupId));
    })();
  }, [groupId]);

  return (
    <div css={style.container(theme.offWhite)}>
      <div>
        {group && <StudyInfo group={group} />}
        <GroupStudyChannel />
        <GroupStudyVoiceChannel />
      </div>

      <GroupStudySettingController user={user} />
    </div>
  );
}

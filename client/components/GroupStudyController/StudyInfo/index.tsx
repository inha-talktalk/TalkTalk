import { getDateString } from '@/utils/date';
import { style } from './style';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';

interface StudyInfoProps {
  group: GroupStudy;
}

export default function StudyInfo({ group }: StudyInfoProps) {
  const { theme } = useGlobalTheme();

  return (
    <div css={style.container}>
      <p css={style.title}>{group.groupName}</p>
      <p css={style.p}>인원 수: {group.groupPersonnel}명</p>
      <p css={style.p}>
        스터디 기간:{' '}
        {!!group.groupDuration
          ? `${getDateString(group.createdAt)} ~ ${getDateString(group.groupDuration)}`
          : '상시'}
      </p>
      <div css={style.tagContainer(theme.gray)}>
        {group.tags.map((tag, idx) => (
          <span key={idx}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

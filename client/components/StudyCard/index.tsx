import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import Button from '../Button';
import { style } from './style';

interface StudyCardProps {
  id: string;
  title: string;
  tags: string[];
  isRegistered?: boolean;
}

export default function StudyCard({ id, title, tags, isRegistered }: StudyCardProps) {
  const { theme } = useGlobalTheme();

  return (
    <div css={style.container}>
      <p>{title}</p>

      <div css={style.tagContainer}>
        {tags.map((tagName, index) => (
          <span key={index} css={style.tag(theme.blueWhite)}>
            {tagName}
          </span>
        ))}
      </div>
      <Button
        value={isRegistered !== undefined && isRegistered === false ? '대기중' : '들어가기'}
        width={'219px'}
        height={'33px'}
        fontSize={'16px'}
        backgroundColor={
          isRegistered !== undefined && isRegistered === false ? theme.secondary : undefined
        }
      />
    </div>
  );
}

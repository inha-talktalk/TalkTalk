import Button from '../Button';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { style } from './style';

interface SelfStudyControllerProps {
  type: 'read' | 'write';
  title: string;
  tags: string[];
}

export default function SelfStudyController({ type, title, tags }: SelfStudyControllerProps) {
  const { theme } = useGlobalTheme();

  return (
    <div css={style.container}>
      <h1>셀프 스터디 ({type === 'read' ? '읽기' : '쓰기'})</h1>
      <p css={style.title}>{title}</p>
      <div css={style.tagContainer(theme.blueWhite)}>
        {tags.map((tag, idx) => (
          <span key={idx}>{tag}</span>
        ))}
      </div>
      <p css={style.time(theme.secondary)}>
        진행 시간: <span>10:10</span>
      </p>
      <div css={style.buttonContainer}>
        <Button value={'완료'} width={'122px'} height={'48px'} fontSize={'20px'} />
        <Button
          value={'취소'}
          width={'122px'}
          height={'48px'}
          fontSize={'20px'}
          backgroundColor={theme.offWhite}
          color={theme.darker}
        />
      </div>
    </div>
  );
}

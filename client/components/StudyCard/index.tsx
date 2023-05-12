import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import Button from '../Button';
import { style } from './style';
import { useRouter } from 'next/router';
import React from 'react';

interface StudyCardProps {
  id: string;
  title: string;
  tags: string[];
  isRegistered?: boolean;
}

function StudyCard({ id, title, tags, isRegistered }: StudyCardProps) {
  const { theme } = useGlobalTheme();
  const router = useRouter();

  const handleButtonClick = () => {
    if (isRegistered !== undefined && isRegistered === false) return;

    router.push(`/studyGroup/${id}`);
  };

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
        onClick={handleButtonClick}
      />
    </div>
  );
}

export default React.memo(StudyCard);

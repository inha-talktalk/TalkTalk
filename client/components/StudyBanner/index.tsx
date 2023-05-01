import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { css } from '@emotion/react';
import Button from '../Button';
import { useRouter } from 'next/router';

const style = {
  container: (backgroundColor: string) => css`
    width: 800px;
    height: 400px;
    background-color: ${backgroundColor};
    padding: 100px;
  `,
  title: css`
    font-weight: 900;
    font-size: 50px;
    margin: 0 0 50px 0;
  `,
  content: css`
    font-weight: 500;
    font-size: 30px;
  `,
  buttons: css`
    display: flex;
  `,
};

export default function StudyBanner() {
  const { theme } = useGlobalTheme();
  const router = useRouter();

  const handleReadButtonClick = () => {
    router.push('/selfStudy/create/read');
  };

  const handleWriteButtonClick = () => {
    router.push('/selfStudy/create/write');
  };

  return (
    <div css={style.container(theme.blueWhite)}>
      <p css={style.title}>오늘은 어떤 주제로 대화해 볼까요?</p>
      <br />
      <p css={style.content}>
        내가 원하는 주제로 대화문 또는 줄글을 만들어
        <br /> 읽거나 듣고 써보세요.
      </p>
      <br />
      <br />
      <br />
      <br />
      <div css={style.buttons}>
        <Button
          value={'스크립트 읽기'}
          width={'205px'}
          height={'59px'}
          fontSize={'30px'}
          onClick={handleReadButtonClick}
        />
        &nbsp;
        <Button
          value={'스크립트 쓰기'}
          width={'205px'}
          height={'59px'}
          fontSize={'30px'}
          backgroundColor={theme.blueWhite}
          color={theme.primary}
          onClick={handleWriteButtonClick}
        />
      </div>
    </div>
  );
}

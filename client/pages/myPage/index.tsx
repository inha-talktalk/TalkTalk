import Button from '@/components/Button';
import InputBar from '@/components/InputBar';
import LazyImage from '@/components/LazyImage';
import MyAchievementList from '@/components/MyAchievementList';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { getUserAchievement } from '@/utils/api';
import { DEAFULT_PLACEHOLDER_GRAY } from '@/utils/image';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

export default function MyPage() {
  const { theme } = useGlobalTheme();
  const [name, setName] = useState<string>('');
  const [nickName, setNickName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>(DEAFULT_PLACEHOLDER_GRAY);
  const [achievement, setAchievement] = useState<UserAcheivement | null>(null);

  const style = {
    container: css`
      width: 1000px;
      margin: auto;
      padding-top: 30px;

      & > h2 {
        font-weight: normal;
        font-size: 24px;
        color: ${theme.secondaryDark};
        margin: 0;
        padding-bottom: 4px;
        border-bottom: 1px solid ${theme.gray};
      }
    `,
    title: css`
      font-weight: normal;
      font-size: 30px;

      & > span {
        color: ${theme.secondary};
      }
    `,
    profile: css`
      display: flex;
      justify-content: space-between;
      padding-top: 20px;
    `,
    profileEmail: css`
      display: flex;
      align-items: center;
    `,
    profileImageContainer: css`
      position: relative;
    `,
    profileImage: css`
      margin-top: 16px;
      border-radius: 50%;
    `,
    profileImageButton: css`
      position: relative;
      left: 0;
      bottom: 43px;
    `,
  };

  // to get user achievement
  useEffect(() => {
    (async () => {
      try {
        setAchievement(await getUserAchievement('test'));
      } catch (e) {
        if (e instanceof Error) {
          console.error(`Error by getUserAchievement on myPage\n${e.message}`);
        }
      }
    })();
  }, []);

  return (
    <div css={style.container}>
      <h1 css={style.title}>
        <span>{name}님</span>의 성장 여정이예요.
      </h1>
      <MyAchievementList achievement={achievement} />

      <br />
      <br />
      <h2>프로필</h2>
      <div css={style.profile}>
        <div>
          <p>이름</p>
          <InputBar width={350} text={name} setText={setName} />
          <p>닉네임</p>
          <InputBar width={350} text={nickName} setText={setNickName} />
          <p>이메일</p>
          <div css={style.profileEmail}>
            <InputBar width={350} text={email} setText={setEmail} />
            &nbsp; &nbsp;
            <Button value={'확인'} width={'50px'} height={'42px'} fontSize={'16px'} />
          </div>
          <br />
          <br />
          <Button value={'프로필 업데이트'} width={'130px'} height={'38px'} fontSize={'16px'} />
        </div>
        <div css={style.profileImageContainer}>
          <LazyImage
            src={imageUrl}
            alt={'프로필 이미지'}
            width={200}
            height={200}
            innerCss={style.profileImage}
          />
          <Button
            value={'수정'}
            width={'48px'}
            height={'38px'}
            fontSize={'16px'}
            innerCss={style.profileImageButton}
          />
        </div>
      </div>
    </div>
  );
}

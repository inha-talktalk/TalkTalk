import Button from '@/components/Button';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { DEAFULT_PLACEHOLDER_GRAY } from '@/utils/image';
import { css } from '@emotion/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const data = `저는 영어를 공부하면서 외국인 친구들과 대화를 나누는 것이 매우 중요하다고 생각합니다. 하지만 제가 사는 지역에서는 영어를 사용하는 기회가 많이 없어서, 온라인 스터디 그룹을 찾아보고 있습니다.

그래서 같이 공부하고 싶은 분들을 모집하려고 합니다. 저와 함께 영어 실력을 향상시킬 분들이면 누구든지 환영합니다. 스터디는 매주 한 번 정도 1시간 정도 진행할 예정이며, 스터디 시간과 날짜는 참여자들끼리 협의하여 정하겠습니다.

스터디에서는 간단한 일상 대화나 영어 회화 실력을 향상시킬 수 있는 다양한 주제를 다룰 예정입니다. 또한, 모임 중에는 서로의 발음이나 억양을 체크해주고, 영어 문법에 대한 질문도 해결해줄 수 있도록 노력할 예정입니다.

관심 있는 분들은 연락 주시면 감사하겠습니다. 

함께 즐겁게 영어를 공부해보아요!`;

export default function PostViewPage() {
  const { theme } = useGlobalTheme();
  const router = useRouter();

  const [groupId, setGroupId] = useState<string>('');

  const style = {
    container: css`
      padding-top: 80px;
    `,
    postView: css`
      width: 690px;
      height: 700px;
      margin: auto;
      padding: 30px 35px;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
      justify-content: space-between;
      box-sizing: border-box;

      & > hr {
        width: 100%;
        border: 1px solid ${theme.gray};
        margin: 0;
      }
    `,
    top: css`
      display: flex;
      justify-content: space-between;
    `,
    title: css`
      display: flex;
      gap: 10px;
      align-items: center;

      & > p {
        font-size: 32px;
        margin: 0;
      }
    `,
    left: css`
      & > p {
        margin: 5px 0 5px 0;
        color: #767676;
      }
    `,
    right: css`
      text-align: center;
      & > p {
        margin: 0;
        color: #767676;
      }
    `,
    profile: css`
      border-radius: 50%;
    `,
    textContainer: css`
      box-sizing: border-box;
      width: 100%;
      height: 450px;
      padding: 15px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `,
    text: css`
      white-space: pre-line;
      font-size: 16px;
      color: ${theme.secondaryDark};
      overflow: auto;
      margin: 15px 0;
    `,
    tagContainer: css`
      display: flex;

      & > span {
        user-select: none;
        background-color: ${theme.blueWhite};
        border-radius: 5px;
        padding: 0px 10px;
        margin: 0 10px 0 0;
        height: 26px;
        text-align: center;
        line-height: 26px;
        font-size: 13px;
      }
    `,
    buttonContainer: css`
      display: flex;
      justify-content: right;
    `,
  };

  useEffect(() => {
    if (router.isReady && typeof router.query.groupStudyId === 'string') {
      setGroupId(router.query.groupStudyId ?? '');
    }
  }, [router.isReady, router.query.groupStudyId]);

  return (
    <div css={style.container}>
      <div css={style.postView}>
        <div css={style.top}>
          <div css={style.left}>
            <div css={style.title}>
              <Button
                value="모집 중"
                width="72px"
                height="27px"
                fontSize="14px"
                backgroundColor={theme.secondary}
              />
              <p>영어 회화 스터디</p>
            </div>
            <p>2023.03.11 20:33 작성 · 조회수 5</p>
            <p>모집기간: 상시 · 현재 인원 3</p>
          </div>
          <div css={style.right}>
            <Image
              css={style.profile}
              src={DEAFULT_PLACEHOLDER_GRAY}
              alt="profile"
              height={70}
              width={70}
            />
            <p>김아랑</p>
          </div>
        </div>
        <hr />
        <div css={style.textContainer}>
          <div css={style.text}>{data}</div>
          <div css={style.tagContainer}>
            <span># 태그1</span>
            <span># 태그1</span>
          </div>
        </div>
        <hr />
        <div css={style.buttonContainer}>
          <Button value="가입하기" width="104px" height="48px" fontSize="20px" />
        </div>
      </div>
    </div>
  );
}

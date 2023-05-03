import Button from '@/components/Button';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { getGroupStudyPost, getUserProfile, postApplyGroupStudy } from '@/utils/api';
import { css } from '@emotion/react';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PostViewPage() {
  const { theme } = useGlobalTheme();
  const router = useRouter();

  const [groupId, setGroupId] = useState<string>('');
  const [groupStudy, setGroupStudy] = useState<GroupStudy | null>(null);
  const [owner, setOwner] = useState<UserProfile | null>(null);

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

  const handleApplyButtonClick = async () => {
    try {
      await postApplyGroupStudy(groupId);
      alert('가입 신청이 완료됐습니다.');
    } catch (e) {
      if (e instanceof AxiosError) {
        alert(`가입에 실패했습니다.\n\n${e.response?.data.message}`);
      }
    }
  };

  useEffect(() => {
    if (router.isReady && typeof router.query.groupStudyId === 'string') {
      setGroupId(router.query.groupStudyId ?? '');
    }
  }, [router.isReady, router.query.groupStudyId]);

  // to get group study post
  useEffect(() => {
    if (groupId === '') return;

    (async () => {
      setGroupStudy(await getGroupStudyPost(groupId));
    })();
  }, [groupId]);

  // to get owner profile
  useEffect(() => {
    if (groupStudy === null) return;
    (async () => {
      setOwner(await getUserProfile(groupStudy.ownerId));
    })();
  }, [groupStudy]);

  if (groupStudy === null || owner === null) {
    return (
      <div css={style.container}>
        <div css={style.postView}></div>
      </div>
    );
  }

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
              <p>{groupStudy.groupName}</p>
            </div>
            <p>2023.03.11 20:33 작성</p>
            <p>모집기간: 상시 · 현재 인원 3</p>
          </div>
          <div css={style.right}>
            <Image
              css={style.profile}
              src={owner.profileIconUrl}
              alt="profile"
              height={70}
              width={70}
            />
            <p>{owner.nickName}</p>
          </div>
        </div>
        <hr />
        <div css={style.textContainer}>
          <div css={style.text}>{groupStudy.introduction}</div>
          <div css={style.tagContainer}>
            {groupStudy.tags.map((tag, idx) => (
              <span key={idx}>{tag}</span>
            ))}
          </div>
        </div>
        <hr />
        <div css={style.buttonContainer}>
          <Button
            value="가입하기"
            width="104px"
            height="48px"
            fontSize="20px"
            onClick={handleApplyButtonClick}
          />
        </div>
      </div>
    </div>
  );
}

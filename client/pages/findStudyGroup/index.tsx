import Button from '@/components/Button';
import InputBar from '@/components/InputBar';
import PostCell from '@/components/PostCell';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { getGroupStudyPost, getGroupStudySearch, getUserProfile } from '@/utils/api';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function FindStudyGroupPage() {
  const { theme } = useGlobalTheme();

  const style = {
    container: css`
      width: 1000px;
      margin: auto;
      padding-top: 40px;
    `,
    title: css`
      font-size: 36px;
      margin: 0;
    `,
    searchContainer: css`
      display: flex;
      justify-content: space-between;
      margin: 15px 0 15px 0;
    `,
    pageNumberContainer: css`
      padding: 15px 0 15px 0;
      display: flex;
      justify-content: center;

      user-select: none;
      cursor: pointer;

      & > span {
        width: 20px;
        text-align: center;
      }

      & > span.current-page {
        font-weight: bold;
      }
    `,
  };

  const [text, setText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [groupStudyIds, setGroupStudyIds] = useState<string[]>([]);
  const [groupStudyList, setGroupStudyList] = useState<GroupStudy[]>([]);
  const [ownerList, setOwnerList] = useState<UserProfile[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPageNum, setTotalPageNum] = useState<number>(1);
  const [startPageNum, setStartPageNum] = useState<number>(1);
  const [endPageNum, setEndPageNum] = useState<number>(1);

  const router = useRouter();

  // to get pageNum, keyword from router
  useEffect(() => {
    if (!router.isReady) return;

    const keyword = router.query.keyword;
    const pageNum = router.query.pageNum;

    if (keyword && !(keyword instanceof Array)) setSearchText(keyword);
    if (pageNum && !(pageNum instanceof Array) && !isNaN(+pageNum)) setPageNum(+pageNum);
  }, [router]);

  // to initial search
  useEffect(() => {
    (async () => {
      const searchResult = await getGroupStudySearch(searchText, pageNum);
      setGroupStudyIds(searchResult.groupIds);
      setTotalPageNum(searchResult.totalPage);
      setText(searchText);
    })();
  }, [searchText, pageNum]);

  // to set pageNum
  useEffect(() => {
    setStartPageNum(Math.max(1, pageNum - 5));
    setEndPageNum(Math.min(totalPageNum, pageNum + 5));
  }, [pageNum, totalPageNum]);

  // to get groupStudy data from ids
  useEffect(() => {
    (async () => {
      const groupStudyPromises = groupStudyIds.map((id) => getGroupStudyPost(id));
      setGroupStudyList(await Promise.all(groupStudyPromises));
    })();
  }, [groupStudyIds]);

  // to get groupStudy owner
  useEffect(() => {
    (async () => {
      const groupStudyOwnerPromises = groupStudyList.map((groupStudy) =>
        getUserProfile(groupStudy.ownerId),
      );
      setOwnerList(await Promise.all(groupStudyOwnerPromises));
    })();
  }, [groupStudyList]);

  const handleSearchButton = () => {
    if (!router.isReady) return;
    router.push({
      pathname: '/findStudyGroup',
      query: {
        keyword: text,
      },
    });
  };

  const handlePageChange = (page: number) => {
    if (!router.isReady) return;
    router.push({
      pathname: '/findStudyGroup',
      query: {
        pageNum: page,
      },
    });
  };

  return (
    <div css={style.container}>
      <p css={style.title}>스터디 그룹 찾기</p>
      <div css={style.searchContainer}>
        <InputBar
          width={810}
          height={52}
          text={text}
          setText={setText}
          onEnterClick={handleSearchButton}
        />
        <Button
          value="검색"
          width="76px"
          height="52px"
          fontSize="20px"
          onClick={handleSearchButton}
        />
        <Button
          value="초기화"
          width="76px"
          height="52px"
          fontSize="20px"
          color={theme.secondaryDark}
          backgroundColor={theme.offWhite}
        />
      </div>
      {groupStudyList.length > 0 &&
        ownerList.length === groupStudyList.length &&
        groupStudyList.map((groupStudy, idx) => (
          <PostCell
            owner={ownerList[idx]}
            group={groupStudy}
            key={idx}
            isLast={idx === groupStudyList.length - 1}
          />
        ))}
      <div css={style.pageNumberContainer}>
        ·
        {Array(endPageNum - startPageNum + 1)
          .fill(0)
          .map((_, idx) => idx + startPageNum)
          .map((val) => (
            <>
              <span
                key={`page-${val}`}
                className={val === pageNum ? 'current-page' : ''}
                onClick={() => {
                  handlePageChange(val);
                }}
              >
                {val}
              </span>
              ·
            </>
          ))}
      </div>
    </div>
  );
}

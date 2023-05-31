import Button from '@/components/Button';
import TagInputBar, { useTagController } from '@/components/TagInputBar';
import TextArea from '@/components/TextArea';
import TitleInputBar from '@/components/TitleInputBar';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { getLanguages, postGroupStudy } from '@/utils/api';
import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Select from 'react-select';
import { toast } from 'react-toastify';

interface SelectValue {
  label: string;
  value: string;
}

export default function CreateGroupStudyPage() {
  const { theme } = useGlobalTheme();
  const style = {
    container: css`
      width: 550px;
      margin: auto;
      padding: 50px 0 40px 0;
    `,
    flex: css`
      position: relative;
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin: 15px 0 15px 0;
    `,
    selectConteiner: css`
      width: 70%;
    `,
    buttonContainer: css`
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      gap: 10px;
      margin-top: 15px;
    `,
  };

  const personnels = [
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
  ];
  const duration = [
    { value: true, label: '항상' },
    { value: false, label: '일자 지정' },
  ];

  const tagController = useTagController([{ value: '# 영어', isRemovable: false }]);
  const router = useRouter();

  const [languages, setLanguages] = useState<SelectValue[]>([]);
  const [language, setLanguage] = useState<SelectValue | null>(null);
  const [personnel, setPersonnel] = useState<number>(2);
  const [isAlways, setIsAlways] = useState<boolean>(true);
  const [finishDate, setFinishDate] = useState<Date>(new Date());
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const handleSubmitButtonClick = async () => {
    if (title === '' || content === '') {
      toast.error('제목과 내용을 작성해 주세요.');
      return;
    }

    if (!language) {
      toast.error('언어를 선택해 주세요.');
      return;
    }

    const createdGroupStudyBody: CreateGroupStudyBody = {
      introduction: content,
      languageId: language.value,
      groupName: title,
      tags: tagController.tags.map((tag) => tag.value),
      groupDuration: isAlways ? null : finishDate.toISOString(),
      groupPersonnel: personnel,
    };

    await postGroupStudy(createdGroupStudyBody);
    router.push('/findStudyGroup');
  };

  const handleCancelButtonClick = useCallback(() => {
    router.push('/');
  }, [router]);

  // to get languages
  useEffect(() => {
    (async () => {
      setLanguages(
        (await getLanguages()).map((language) => ({
          label: language.label,
          value: language.id,
        })),
      );
    })();
  }, []);

  // to set default language
  useEffect(() => {
    if (languages.length === 0) return;
    setLanguage(languages[0]);
  }, [languages]);

  // to change default tag
  useEffect(() => {
    if (!language) return;
    if (tagController.tags.length === 0) {
      tagController.setTags([
        {
          value: `# ${language.label}`,
          isRemovable: false,
        },
      ]);
      return;
    }
    tagController.setTags((tags) =>
      tags.map((tag) => {
        if (!tag.isRemovable) {
          return {
            value: `# ${language.label}`,
            isRemovable: false,
          };
        } else {
          return tag;
        }
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, tagController.setTags]);

  return (
    <>
      <Head>
        <title>TalkTalk - 그룹 스터디 생성</title>
      </Head>
      <div css={style.container}>
        <TitleInputBar
          width={548}
          height={44}
          placeholder="스터디 명"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TagInputBar width={548} height={44} tagController={tagController} />
        <div css={style.flex}>
          <span>언어</span>
          <div css={style.selectConteiner}>
            <Select
              options={languages}
              onChange={(e) => setLanguage(e ?? languages[0])}
              value={language}
            />
          </div>
        </div>
        <div css={style.flex}>
          <span>스터디 인원 수</span>
          <div css={style.selectConteiner}>
            <Select
              options={personnels}
              onChange={(e) => setPersonnel(e?.value ?? 0)}
              defaultValue={personnels[0]}
            />
          </div>
        </div>
        <div css={style.flex}>
          <span>스터디 기간</span>
          <div css={style.selectConteiner}>
            <Select
              options={duration}
              defaultValue={duration[0]}
              onChange={(e) => setIsAlways(e?.value ?? true)}
            />
          </div>
        </div>
        <div css={style.flex}>
          <p></p>
          {!isAlways && (
            <div css={style.selectConteiner}>
              <Calendar
                locale="ko"
                minDate={new Date()}
                minDetail="year"
                calendarType="US"
                onChange={(val) => {
                  if (val instanceof Date) {
                    setFinishDate(val);
                  }
                }}
              />
            </div>
          )}
        </div>
        <TextArea height={416} width={528} text={content} setText={setContent} />
        <div css={style.buttonContainer}>
          <Button
            value={'취소'}
            width={'93px'}
            height={'51px'}
            fontSize={'20px'}
            backgroundColor={theme.offWhite}
            color={theme.black}
            onClick={handleCancelButtonClick}
          />
          <Button
            value={'등록'}
            width={'93px'}
            height={'51px'}
            fontSize={'20px'}
            onClick={handleSubmitButtonClick}
          />
        </div>
      </div>
    </>
  );
}

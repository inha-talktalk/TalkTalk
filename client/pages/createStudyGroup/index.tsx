import Button from '@/components/Button';
import TagInputBar, { useTagController } from '@/components/TagInputBar';
import TextArea from '@/components/TextArea';
import TitleInputBar from '@/components/TitleInputBar';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { getLanguages, postGroupStudy } from '@/utils/api';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Select from 'react-select';

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

  const [languages, setLanguages] = useState([{ label: '한국어', value: 'ko' }]);
  const [language, setLanguage] = useState(languages[0]);
  const [personnel, setPersonnel] = useState<number>(2);
  const [isAlways, setIsAlways] = useState<boolean>(true);
  const [finishDate, setFinishDate] = useState<Date>(new Date());
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const handleSubmitButtonClick = async () => {
    if (title === '' || content === '') {
      alert('제목과 내용을 작성해 주세요.');
      return;
    }

    const createGroupStudyBody: CreateGroupStudyBody = {
      introduction: content,
      languageId: language.value,
      groupName: title,
      tags: tagController.tags.map((tag) => tag.value),
      groupDuration: isAlways ? null : finishDate.toISOString(),
      groupPersonnel: personnel,
    };

    await postGroupStudy(createGroupStudyBody);
    router.push('/findStudyGroup');
  };

  const handleCancelButtonClick = useCallback(() => {
    router.push('/');
  }, [router]);

  // to change default tag
  useEffect(() => {
    tagController.setTags([
      {
        value: `# ${language.label}`,
        isRemovable: false,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, tagController.setTags]);

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

  return (
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
            defaultValue={languages[0]}
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
  );
}

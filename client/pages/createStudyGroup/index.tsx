import Button from '@/components/Button';
import TagInputBar, { useTagController } from '@/components/TagInputBar';
import TextArea from '@/components/TextArea';
import TitleInputBar from '@/components/TitleInputBar';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
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

  const languages = [
    // TODO: 추후에 API 반환값으로 변경 예정
    { value: 'en', label: '영어' },
    { value: 'ko', label: '한국어' },
  ];

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

  const [language, setLanguage] = useState(languages[0]);
  const [personnel, setPersonnel] = useState<number>(2);
  const [isAlways, setIsAlways] = useState<boolean>(true);
  const [finishDate, setFinishDate] = useState<Date>(new Date());

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

  return (
    <div css={style.container}>
      <TitleInputBar width={548} height={44} placeholder="스터디 명" />
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
      <TextArea height={416} width={528} />
      <div css={style.buttonContainer}>
        <Button
          value={'취소'}
          width={'93px'}
          height={'51px'}
          fontSize={'20px'}
          backgroundColor={theme.offWhite}
          color={theme.black}
        />
        <Button value={'등록'} width={'93px'} height={'51px'} fontSize={'20px'} />
      </div>
    </div>
  );
}

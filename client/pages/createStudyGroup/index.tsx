import TagInputBar, { useTagController } from '@/components/TagInputBar';
import TitleInputBar from '@/components/TitleInputBar';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import Select from 'react-select';

export default function CreateGroupStudyPage() {
  const style = {
    container: css`
      width: 550px;
      margin: auto;
      padding-top: 50px;
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
  const [isAlways, setIsAlways] = useState<boolean>(false);

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
    </div>
  );
}

import Button from '@/components/Button';
import TagInputBar, { useTagController } from '@/components/TagInputBar';
import TitleInputBar from '@/components/TitleInputBar';
import { useState } from 'react';
import Select from 'react-select';
import { style } from './style';
import { useRouter } from 'next/router';

interface CreateSelfStudyProps {
  type: 'read' | 'write';
}

export default function CreateSelfStudy({ type }: CreateSelfStudyProps) {
  const tagController = useTagController();
  const router = useRouter();

  const [title, setTitle] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [scriptType, setScriptType] = useState<string>('');

  const languages = [
    // TODO: 추후에 API 반환값으로 변경 예정
    { value: 'en', label: '영어' },
    { value: 'ko', label: '한국어' },
  ];

  const scriptTypes = [
    // TODO: 추후에 API 반환값으로 변경 예정
    { value: 'type1', label: '대화문' },
  ];

  const handleStartButtonClick = () => {
    if (title === '' || tagController.tags.length === 0) {
      alert('제목과 태그를 설정하세요');
      return;
    }
    if (language === '' || scriptType === '') {
      alert('언어와 스크립트 형태를 선택하세요');
      return;
    }

    router.push(`/selfStudy/${type}`);
  };

  return (
    <div css={style.container}>
      <p css={style.titleP}>셀프 스터디({type === 'read' ? '읽기' : '쓰기'})</p>
      <TitleInputBar
        width={548}
        height={44}
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TagInputBar width={548} height={44} tagController={tagController} />

      <br />

      <div css={style.flex}>
        <span>언어</span>
        <div css={style.selectBox}>
          <Select options={languages} onChange={(e) => setLanguage(e?.value ?? '')} />
        </div>
      </div>
      <div css={style.flex}>
        <span>스크립트 형태</span>
        <div css={style.selectBox}>
          <Select options={scriptTypes} onChange={(e) => setScriptType(e?.value ?? '')} />
        </div>
      </div>
      <Button
        value={'시작하기'}
        width={'426px'}
        height={'48px'}
        fontSize={'20px'}
        innerCss={style.button}
        onClick={handleStartButtonClick}
      />
    </div>
  );
}

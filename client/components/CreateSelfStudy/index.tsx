import Button from '@/components/Button';
import TagInputBar, { useTagController } from '@/components/TagInputBar';
import TitleInputBar from '@/components/TitleInputBar';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { style } from './style';
import { useRouter } from 'next/router';
import { getLanguages, getScriptTypes } from '@/utils/api';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { selfStudy } from '@/states/selfStudy';

interface CreateSelfStudyProps {
  type: 'read' | 'write';
}

interface SelectValue {
  label: string;
  value: string;
}

interface LanguageSelectValue extends SelectValue {
  stt: string;
  tts: string;
}

export default function CreateSelfStudy({ type }: CreateSelfStudyProps) {
  const tagController = useTagController();
  const router = useRouter();

  const [title, setTitle] = useState<string>('');
  const [languages, setLanguages] = useState<LanguageSelectValue[]>([]);
  const [language, setLanguage] = useState<LanguageSelectValue | null>(null);
  const [scriptTypes, setScriptTypes] = useState<SelectValue[]>([]);
  const [scriptType, setScriptType] = useState<SelectValue | null>(null);
  const [_, setSelfStudy] = useRecoilState(selfStudy);

  const handleStartButtonClick = () => {
    if (title === '') {
      toast.error('제목을 입력하세요');
      return;
    }

    if (!scriptType) {
      toast.error('언어와 스크립트 형태를 선택하세요');
      return;
    }

    setSelfStudy({
      title: title,
      tags: tagController.tags.map((tag) => tag.value),
      languageId: language?.value || '',
      scriptType: scriptType?.value || '',
      languaegStt: language?.stt || '',
      selfStudyId: null,
      startDate: null,
    });

    router.push(`/selfStudy/${type}`);
  };

  // to get languages
  useEffect(() => {
    (async () => {
      setLanguages(
        (await getLanguages()).map((language) => ({
          label: language.label,
          value: language.id,
          stt: language.stt,
          tts: language.tts,
        })),
      );
    })();
  }, []);

  // to get script types
  useEffect(() => {
    (async () => {
      setScriptTypes(await getScriptTypes());
    })();
  }, []);

  // to set default script type
  useEffect(() => {
    if (scriptTypes.length === 0) return;
    setScriptType(scriptTypes[0]);
  }, [scriptTypes]);

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
          <Select
            options={languages}
            value={language}
            onChange={(e) => setLanguage(e ?? languages[0])}
          />
        </div>
      </div>
      <div css={style.flex}>
        <span>스크립트 형태</span>
        <div css={style.selectBox}>
          <Select
            options={scriptTypes}
            onChange={(e) => setScriptType(e ?? scriptTypes[0])}
            value={scriptType}
          />
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

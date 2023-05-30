import { RiRecordCircleFill } from 'react-icons/ri';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import ChatBubble from '@/components/ChatBubble';
import { style } from '../style';
import ChatInputBar from '@/components/ChatInputBar';
import { useSpeech } from '@/utils/speechRecognition';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selfStudy, selfStudyStarted, submitSelfStudy } from '@/states/selfStudy';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useRecord from '@/utils/record';
import { postSelfStudyRead } from '@/utils/api';
import { toast } from 'react-toastify';

interface SelfStudyPanelReadProps {
  script: SelfStudyScriptResponse | null;
}

export default function SelfStudyPanelRead({ script }: SelfStudyPanelReadProps) {
  const { theme } = useGlobalTheme();
  const [myChatList, setMyChatList] = useState<string[]>([]);
  const [recordFileList, setRecordFileList] = useState<File[]>([]);
  const selfStudyInfo = useRecoilValue(selfStudy);
  const { value, start, stop, isListening, resetValue } = useSpeech(selfStudyInfo?.languaegStt);
  const isSelfStudyStarted = useRecoilValue(selfStudyStarted);
  const [submit, setSubmit] = useRecoilState(submitSelfStudy);
  const router = useRouter();
  const { startRecord, stopRecord } = useRecord();

  useEffect(() => {
    if (!router.isReady) return;

    if (submit) {
      setSubmit(false);
      if (!script) return;
      if (myChatList.length !== script.scripts.length) {
        toast.warn('스터디를 모두 완료해 주세요');
        return;
      }
      (async () => {
        if (!selfStudyInfo || selfStudyInfo.selfStudyId === null) return;
        const form = new FormData();
        recordFileList.forEach((file) => form.append('fileList', file));
        form.append('textList', JSON.stringify(myChatList));
        form.append('selfStudyId', selfStudyInfo.selfStudyId);

        await postSelfStudyRead(form);
      })();
    }
  }, [myChatList, recordFileList, router.isReady, script, selfStudyInfo, setSubmit, submit]);

  if (!script) return <></>;

  return (
    <div css={style.container}>
      <div css={style.bubbleContainer}>
        {Array(Math.min(myChatList.length + 1, script.scripts.length))
          .fill(0)
          .map((_, idx) => (
            <>
              <div className="left">
                <ChatBubble position={'left'} value={script.scripts[idx].text} />
              </div>
              <div className="right">
                <ChatBubble position={'right'} value={myChatList[idx] ?? '...'} />
              </div>
            </>
          ))}
      </div>
      <div css={style.chatInputContainer}>
        <ChatInputBar
          value={value}
          onSend={() => {
            setMyChatList((list) => [...list, value]);
            resetValue();
          }}
          disabled={!isSelfStudyStarted}
        >
          <RiRecordCircleFill
            size={36}
            color={isListening ? '#F56060' : theme.secondary}
            onClick={() => {
              if (!isSelfStudyStarted) return;
              if (isListening) {
                stop();
                stopRecord(`${myChatList.length + 1}.mp3`).then((value) => {
                  setRecordFileList((list) => {
                    if (list.length === myChatList.length) {
                      return [...list, value];
                    } else {
                      return list.map((file, idx) => (idx === list.length - 1 ? value : file));
                    }
                  });
                });
              } else {
                start();
                startRecord();
                resetValue();
              }
            }}
          />
        </ChatInputBar>
      </div>
    </div>
  );
}

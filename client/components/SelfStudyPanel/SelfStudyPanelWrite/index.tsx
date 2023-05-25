import { useEffect, useState } from 'react';
import ChatBubble from '@/components/ChatBubble';
import { style } from '../style';
import ChatInputBar from '@/components/ChatInputBar';
import AudioButton from '../AudioButton';
import { useRecoilState } from 'recoil';
import { selfStudy, selfStudyStarted, submitSelfStudy } from '@/states/selfStudy';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { postSelfStudyWrite } from '@/utils/api';

interface SelfStudyPanelWriteProps {
  script: SelfStudyScriptResponse | null;
}

export default function SelfStudyPanelWrite({ script }: SelfStudyPanelWriteProps) {
  const [chatValue, setChatValue] = useState<string>('');
  const [myChatList, setMyChatList] = useState<string[]>([]);
  const [submit, setSubmit] = useRecoilState(submitSelfStudy);
  const [isSelfStudyStarted, setSelfStudyStarted] = useRecoilState(selfStudyStarted);
  const [selfstudyInfo, setSelfStudyInfo] = useRecoilState(selfStudy);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    if (submit) {
      (async () => {
        if (!selfstudyInfo || selfstudyInfo.selfStudyId === null) return;
        await postSelfStudyWrite(
          selfstudyInfo.selfStudyId,
          myChatList.map((chat) => ({ text: chat })),
        );
        router.push('/selfStudy');
        toast.info('셀프 스터디를 완료했습니다.');
        setSubmit(false);
        setSelfStudyStarted(false);
        setSelfStudyInfo(null);
      })();
    }
  }, [submit, router, setSubmit, setSelfStudyStarted, selfstudyInfo, myChatList, setSelfStudyInfo]);

  if (!script) return <></>;

  return (
    <div css={style.container}>
      <div css={style.bubbleContainer}>
        {Array(Math.min(myChatList.length + 1, script.scripts.length))
          .fill(0)
          .map((_, idx) => (
            <>
              <div className="left">
                <ChatBubble
                  position={'left'}
                  value={!!myChatList[idx] ? script.scripts[idx].text : '...'}
                />
              </div>
              {!!myChatList[idx] && (
                <div className="right">
                  <ChatBubble position={'right'} value={myChatList[idx]} />
                </div>
              )}
            </>
          ))}
      </div>
      <div css={style.chatInputContainer}>
        <ChatInputBar
          value={chatValue}
          onSend={() => {
            if (script.scripts.length === myChatList.length) return;
            setMyChatList((list) => [...list, chatValue]);
            setChatValue('');
          }}
          onChange={setChatValue}
          disabled={!isSelfStudyStarted}
        >
          <AudioButton
            url={
              script.scripts.length > myChatList.length
                ? script.scripts[myChatList.length].mp3Uri
                : ''
            }
            disabled={!isSelfStudyStarted}
          />
        </ChatInputBar>
      </div>
    </div>
  );
}

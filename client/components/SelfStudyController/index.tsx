import Button from '../Button';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { style } from './style';
import { getDateString, getTimeDiffToString } from '@/utils/date';
import Modal from '../Modal';
import SelfStudySharePanel from '../SelfStudySharePanel';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selfStudy, selfStudyStarted, submitSelfStudy } from '@/states/selfStudy';
import { useRouter } from 'next/router';
import { deleteSelfStudy, postStartSelfStudy } from '@/utils/api';

interface SelfStudyControllerProps {
  type: 'read' | 'write';
  title: string;
  tags: string[];
  status?: 'progress' | 'done';
  time: Date;
}

export default function SelfStudyController({
  type,
  title,
  tags,
  status = 'progress',
  time,
}: SelfStudyControllerProps) {
  const { theme } = useGlobalTheme();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [_, setSubmit] = useRecoilState(submitSelfStudy);
  const [isSelfStudyStarted, setSelfStudyStarted] = useRecoilState(selfStudyStarted);
  const [selfStudyInfo, setSelfStudyInfo] = useRecoilState(selfStudy);
  const [duration, setDuration] = useState<string>('');
  const router = useRouter();

  const handleShareButtonClick = () => {
    setShowModal(true);
  };

  const handleSubmitButtonClick = () => {
    if (isSelfStudyStarted) {
      setSubmit(true);
    } else {
      if (!selfStudyInfo) return;
      (async () => {
        const id = await postStartSelfStudy(
          selfStudyInfo.title,
          selfStudyInfo.scriptType,
          selfStudyInfo.tags,
        );
        setSelfStudyInfo({ ...selfStudyInfo, startDate: new Date(), selfStudyId: id });
        setSelfStudyStarted(true);
      })();
    }
  };

  const handleCancelButtonClick = () => {
    setSelfStudyStarted(false);
    router.push('/selfStudy');
  };

  // to delete not finished self study
  useEffect(() => {
    const handleRouterChange = () => {
      setSelfStudyInfo(null);
      setSelfStudyStarted(false);
      if (!selfStudyInfo?.selfStudyId) return;
      deleteSelfStudy(selfStudyInfo?.selfStudyId);
    };
    router.events.on('routeChangeStart', handleRouterChange);

    return () => router.events.off('routeChangeStart', handleRouterChange);
  }, [router, selfStudyInfo?.selfStudyId, setSelfStudyInfo, setSelfStudyStarted]);

  // to update duration strign
  useEffect(() => {
    const id = setInterval(() => {
      if (!selfStudyInfo?.startDate) return;
      setDuration(getTimeDiffToString(selfStudyInfo.startDate, new Date()));
    }, 1000);

    return () => clearInterval(id);
  }, [selfStudyInfo?.startDate]);

  return (
    <>
      {status === 'done' && (
        <Modal setShow={setShowModal} isShow={showModal}>
          <SelfStudySharePanel />
        </Modal>
      )}
      <div css={style.container}>
        <h1>셀프 스터디 ({type === 'read' ? '읽기' : '쓰기'})</h1>
        <p css={style.title}>{title}</p>
        <div css={style.tagContainer(theme.blueWhite)}>
          {tags.map((tag, idx) => (
            <span key={idx}>{tag}</span>
          ))}
        </div>
        <p css={style.time(theme.secondary)}>
          {status === 'progress' ? (
            <>
              진행 시간: <span>{duration || '00:00:00'}</span>
            </>
          ) : (
            <>
              완료 날짜: <span>{getDateString(time)}</span>
            </>
          )}
        </p>
        <div css={style.buttonContainer}>
          {status === 'progress' ? (
            <>
              <Button
                value={isSelfStudyStarted ? '완료' : '시작'}
                width={'122px'}
                height={'48px'}
                fontSize={'20px'}
                onClick={handleSubmitButtonClick}
              />
              <Button
                value={'취소'}
                width={'122px'}
                height={'48px'}
                fontSize={'20px'}
                backgroundColor={theme.offWhite}
                color={theme.darker}
                onClick={handleCancelButtonClick}
              />
            </>
          ) : (
            <>
              <Button
                value={'공유하기'}
                width={'100%'}
                height={'48px'}
                fontSize={'16px'}
                onClick={handleShareButtonClick}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

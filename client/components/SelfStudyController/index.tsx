import Button from '../Button';
import { useGlobalTheme } from '@/styles/GlobalThemeContext';
import { style } from './style';
import { getDateString } from '@/utils/date';
import Modal from '../Modal';
import SelfStudySharePanel from '../SelfStudySharePanel';
import { useState } from 'react';

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

  const handleShareButtonClick = () => {
    setShowModal(true);
  };

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
              진행 시간: <span>10:10</span>
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
              <Button value={'완료'} width={'122px'} height={'48px'} fontSize={'20px'} />
              <Button
                value={'취소'}
                width={'122px'}
                height={'48px'}
                fontSize={'20px'}
                backgroundColor={theme.offWhite}
                color={theme.darker}
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

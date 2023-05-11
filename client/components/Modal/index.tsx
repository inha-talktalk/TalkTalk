import { Dispatch, ReactNode, SetStateAction } from 'react';
import { style } from './style';

interface ModalProps {
  children?: ReactNode;
  isShow: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default function Modal({ children, isShow, setShow }: ModalProps) {
  const handleBackgroundClick = () => {
    setShow(false);
  };

  return (
    <div css={style.background(isShow)} onClick={handleBackgroundClick}>
      <div
        css={style.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}

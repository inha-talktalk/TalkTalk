import { css } from '@emotion/react';
import Image from 'next/image';
import { useContext } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

interface ArrowProps {
  direction: 'left' | 'right';
}

export default function Arrow({ direction }: ArrowProps) {
  const { scrollNext, scrollPrev } = useContext(VisibilityContext);
  const onClick = (direction: 'left' | 'right') => () => {
    if (direction === 'left') {
      scrollPrev();
    } else {
      scrollNext();
    }
  };
  const style = {
    left: css`
      border-radius: 10px 0 0 10px;
    `,
    right: css`
      border-radius: 0 10px 10px 0;
    `,
  };

  return (
    <div
      css={css`
        background-color: white;
        width: 40px;
        text-align: center;
        position: relative;
        user-select: none;
        cursor: pointer;
        ${direction === 'left' ? style.left : style.right}

        &:hover {
          filter: brightness(0.9);
        }

        &:active {
          filter: brightness(0.85);
        }
      `}
      onClick={onClick(direction)}
    >
      <Image
        css={css`
          position: relative;
          top: calc(50% - 8px);
          left: 0;
          transform: rotate(${direction === 'left' ? '-' : ''}90deg);
        `}
        src="/arrow.svg"
        height={16}
        width={21}
        alt="arrow"
      />
    </div>
  );
}

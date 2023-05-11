import { css } from '@emotion/react';

export const style = {
  background: (isShow: boolean) => css`
    display: ${isShow ? 'block' : 'none'};
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    backdrop-filter: blur(2px);
  `,
  container: css`
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
  `,
};

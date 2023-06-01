import { css } from '@emotion/react';

export const style = {
  container: css`
    height: calc(100% - 100px);
    min-width: 450px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    & > div {
      display: flex;
      align-items: center;
      padding: 0 15px;
      box-sizing: border-box;
      width: 450px;
    }
  `,
  tabButton: (backgroundColor: string, color: string, isLeft: boolean) => css`
    width: 50%;
    height: 40px;
    background-color: ${backgroundColor};
    color: ${color};
    border-radius: ${isLeft ? '10px 0' : '0 10px'} 0 0;

    border: none;
    padding: 0;
    font: inherit;
    outline: none;

    &:active {
      filter: brightness(0.95);
    }
  `,
  p: css`
    text-align: center;
  `,
};

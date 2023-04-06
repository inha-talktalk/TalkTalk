import { css } from '@emotion/react';

export const style = {
  container: css`
    width: 100%;
    height: 75px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  left: css`
    display: flex;
    align-items: center;
    width: 800px;
    justify-content: space-around;
  `,
  span: (color: string) => css`
    font-size: 20px;
    color: ${color};
    margin: 0 15px;
    user-select: none;
    cursor: pointer;
  `,
};

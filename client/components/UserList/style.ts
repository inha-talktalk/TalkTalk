import { css } from '@emotion/react';

export const style = {
  container: (backgroundColor: string) => css`
    width: 300px;
    height: 100%;
    background-color: ${backgroundColor};
    padding: 10px;
    box-sizing: border-box;
  `,
  title: (color: string) => css`
    margin: 0;
    font-size: 14px;
    color: ${color};
    margin-bottom: 15px;
  `,
};

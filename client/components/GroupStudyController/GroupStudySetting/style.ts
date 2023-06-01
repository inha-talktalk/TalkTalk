import { css } from '@emotion/react';

export const style = {
  container: (backgroundColor: string) => css`
    height: 400px;
    border-radius: 10px;
    padding: 15px 15px;
    box-sizing: border-box;
    background-color: ${backgroundColor};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
};

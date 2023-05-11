import { css } from '@emotion/react';

export const style = {
  container: (backgroundColor: string) => css`
    height: 100%;
    width: 300px;
    padding: 15px;
    box-sizing: border-box;
    background-color: ${backgroundColor};

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
};

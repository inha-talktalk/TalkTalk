import { css } from '@emotion/react';

export const style = {
  container: (backgroundColor: string) => css`
    width: 550px;
    height: 340px;
    border-radius: 10px;
    padding: 15px 90px;
    box-sizing: border-box;
    background-color: ${backgroundColor};
  `,
  inner: css`
    height: calc(100% - 70px);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    margin: 15px 0;

    & > div {
      display: flex;
      align-items: center;
      padding: 0 15px;
      box-sizing: border-box;
    }
  `,
};

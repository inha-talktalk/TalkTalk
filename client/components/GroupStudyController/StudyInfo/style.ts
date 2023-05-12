import { css } from '@emotion/react';

export const style = {
  container: css`
    height: 154px;
    width: 100%;
  `,
  title: css`
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  `,
  p: css`
    font-size: 13px;
  `,
  tagContainer: (backgroundColor: string) => css`
    display: flex;

    & > span {
      background-color: ${backgroundColor};
      border-radius: 5px;
      padding: 0px 10px;
      margin: 0 10px 0 0;
      height: 26px;
      text-align: center;
      line-height: 26px;
      font-size: 13px;
    }
  `,
};

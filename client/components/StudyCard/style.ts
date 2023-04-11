import { css } from '@emotion/react';

export const style = {
  container: css`
    width: 219px;
    height: 128px;
    border-radius: 10px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    padding: 20px;
    margin: 5px 10px;

    & > p {
      margin: 5px 0;
      font-size: 24px;
    }
  `,
  tag: (backgroundColor: string) => css`
    display: inline-block;
    background-color: ${backgroundColor};
    border-radius: 5px;
    padding: 0px 10px;
    margin: 0 10px 0 0;
    height: 26px;
    text-align: center;
    line-height: 26px;
    font-size: 13px;
    white-space: nowrap;
  `,
  tagContainer: css`
    height: 26px;
    margin: 15px 0;
    overflow: hidden;
  `,
};

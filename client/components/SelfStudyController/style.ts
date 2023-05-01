import { css } from '@emotion/react';
export const style = {
  container: css`
    width: 300px;
    border-radius: 10px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    padding: 15px;
    box-sizing: border-box;
    margin: 15px;

    & > h1 {
      font-size: 24px;
    }
  `,
  title: css`
    font-size: 20px;
  `,
  buttonContainer: css`
    display: flex;
    justify-content: space-between;
  `,
  tagContainer: (backgroundColor: string) => css`
    display: flex;
    overflow: hidden;

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
  time: (color: string) => css`
    font-size: 16px;

    & > span {
      color: ${color};
    }
  `,
};

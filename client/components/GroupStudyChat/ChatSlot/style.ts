import { css } from '@emotion/react';

export const style = {
  container: css`
    width: 100%;
    min-height: 60px;
    padding: 10px 10px;
    display: flex;
    gap: 5px;
    box-sizing: border-box;

    &:hover {
      box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.05);
    }
  `,
  image: css`
    border-radius: 50%;
  `,
  right: css`
    padding-top: 7px;

    & > span:first-of-type {
      font-weight: bold;
      font-size: 16px;
      padding: 0 5px;
    }

    & > span:nth-of-type(2) {
      font-size: 14px;
      color: #848484;
    }

    & > p {
      margin: 0;
      padding-top: 10px;
      padding-left: 5px;
    }
  `,
  shareContainer: css`
    height: 81px;
    width: 400px;
    background-color: rgba(0, 0, 0, 0.02);
    border-radius: 10px;
    padding: 15px;
    box-sizing: border-box;
    margin: 5px;
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
  bottom: css`
    font-size: 13px;
  `,
  bottomFirst: css`
    margin-right: 10px;
  `,
};

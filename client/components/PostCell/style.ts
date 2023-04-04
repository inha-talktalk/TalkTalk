import { css } from '@emotion/react';

export const style = {
  container: (isLastOne: boolean, borderColor: string) => css`
    width: 1000px;
    border-top: 1px solid ${borderColor};
    ${isLastOne && `border-bottom: 1px solid ${borderColor};`}
    padding: 5px;
  `,
  top: css`
    display: flex;
    align-items: center;
  `,
  title: css`
    margin: 0 10px;
    font-size: 20px;
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
  bottom: (color: string) => css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: ${color};
    font-size: 12px;
  `,
};

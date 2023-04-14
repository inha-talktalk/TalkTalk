import { css } from '@emotion/react';

export const style = {
  container: (width: number, height: number) => css`
    max-width: ${width}px;
    min-height: ${height}px;
    display: flex;
    gap: 5px;
    align-items: center;
    padding: 5px;
    flex-wrap: wrap;
  `,
  input: (height: number) => css`
    height: ${height}px;
    line-height: ${height}px;
    border: none;
    outline: none;
    appearance: noen;
    font-size: 16px;
  `,
  tag: (backgroundColor: string) => css`
    background-color: ${backgroundColor};
    border-radius: 5px;
    padding: 0px 10px;
    margin: 0 10px 0 0;
    height: 26px;
    text-align: center;
    font-size: 16px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    user-select: none;

    & > button {
      border: none;
      cursor: pointer;

      &:hover {
        color: #e53e3e;
        transition: all 0.2s ease;
      }
    }
  `,
};

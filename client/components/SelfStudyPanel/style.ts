import { css } from '@emotion/react';

export const style = {
  container: css`
    width: 70%;
    height: 820px;
    border-radius: 10px;
    margin: 15px;
    padding: 15px;
    position: relative;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  `,
  bubbleContainer: css`
    height: 90%;
    overflow: auto;
    margin-bottom: 15px;
    padding-bottom: 10px;

    & > div {
      margin: 0;
      padding: 10px;
    }

    & > div.right {
      text-align: right;
      & > div {
        text-align: left;
      }
    }
  `,
  chatInputContainer: css`
    & > div {
      position: relative;
      left: 50%;
      transform: translate(-50%);
    }
  `,
};

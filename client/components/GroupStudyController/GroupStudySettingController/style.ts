import { css } from '@emotion/react';

export const style = {
  container: (color: string) => css`
    width: 100%;
    height: 60px;
    border-top: 1px solid ${color};
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  image: (isOnline: boolean, color: string) => css`
    position: relative;

    & > span {
      position: absolute;
      bottom: 0;
      right: 0;
      display: inline-block;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      background-color: ${isOnline ? '#00d008' : color};
    }
  `,
  left: css`
    display: flex;
    align-items: center;
    gap: 15px;
  `,
  name: (color: string) => css`
    & > p {
      margin: 0;
    }

    & > p:first-child {
      font-size: 16px;
    }

    & > p:nth-child(2) {
      font-size: 14px;
      color: ${color};
    }
  `,
  right: css`
    color: #626262;
    display: flex;
    gap: 10px;
  `,
  voiceChannelContainer: css`
    display: flex;
    justify-content: space-between;
    height: 50px;
    align-items: center;

    & > span {
      color: #32bf64;
      font-size: 16px;
    }
  `,
};

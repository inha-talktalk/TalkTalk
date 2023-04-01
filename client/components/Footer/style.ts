import { Theme } from '@/styles/theme';
import { css } from '@emotion/react';

export default function footerStyle(theme: Theme) {
  return {
    container: css`
      width: 100%;
      height: 414px;
      background-color: ${theme.secondaryDark};
    `,
    logo: css`
      font-size: 32px;
      color: ${theme.gray};
      font-wieght: bold;
    `,
    copyright: css`
      font-size: 20px;
      color: white;
    `,
    top: css`
      display: flex;
      flex-direction: row;
      height: 300px;
      justify-content: space-around;
      padding: 25px 0;
    `,
    col: css`
      width: 200px;
      display: flex;
      flex-direction: column;
    `,
    titleCol: css`
      font-size: 20px;
      color: white;
      font-weight: 500;
    `,
    contentCol: css`
      font-size: 16px;
      color: ${theme.gray};
      padding: 25px 0;
    `,
    bottom: css`
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    `,
    spacer: css`
      width: 35%;
      text-align: center;
    `,
    image: css`
      margin: 0 10px;
    `,
  };
}

import { css } from '@emotion/react';

export const style = {
  container: css`
    width: 100%;

    & > p {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    }
  `,
  select: (selected: string) => css`
    padding: 5px 10px;

    & > p {
      margin: 0;
      padding: 10px;
      border-radius: 10px;
      margin: 5px 0;
    }

    & > p.${selected} {
      box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.1) !important;
    }

    & > p:hover {
      box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.05);
    }

    & span {
      color: gray;
    }
  `,
};

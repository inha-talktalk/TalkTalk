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
  select: css`
    padding: 5px 10px;

    & > p {
      margin: 0;
      padding: 5px 10px;
      border-radius: 10px;
      margin: 5px 0;
      display: flex;
      align-items: center;
      gap: 5px;

      &:hover {
        box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.1);
      }
    }

    & span {
      color: gray;
    }
  `,
  userSlotContainer: css`
    padding-left: 25px;
  `,
};

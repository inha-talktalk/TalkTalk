import { css } from '@emotion/react';

export const style = {
  container: css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
  chatContainer: css`
    height: 100%;
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column-reverse;
  `,
  inputBarContainer: css`
    padding: 15px;
  `,
};

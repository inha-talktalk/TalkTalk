import { css } from '@emotion/react';

export const style = {
  container: css`
    padding: 30px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  `,
  cardContainer: css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    overflow-y: auto;
    height: 350px;
    min-width: 837px;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  title: css`
    font-size: 32px;
    font-weight: bold;
    margin: 0;
    padding: 10px 10px;
  `,
  subTitle: css`
    color: #878787;
    font-size: 16px;
    margin: 0;
    padding: 0px 10px 20px 10px;
  `,
  placeholder: css`
    width: 219px;
    height: 128px;
    border-radius: 10px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    padding: 20px;
    margin: 5px 10px;
  `,
  noneStudyP: css`
    text-align: center;
    color: #878787;
    margin-top: 40px;
  `,
};

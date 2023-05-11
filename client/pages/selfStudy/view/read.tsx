import InfoBanner from '@/components/InfoBanner';
import SelfStudyController from '@/components/SelfStudyController';
import SelfStudyPanel from '@/components/SelfStudyPanel';
import { css } from '@emotion/react';

export default function ViewSelfStudyRead() {
  const style = {
    container: css`
      display: flex;
      width: 100%;
      justify-content: space-around;
    `,
  };
  return (
    <div css={style.container}>
      <SelfStudyPanel type={'readDone'} />
      <div>
        <SelfStudyController
          type={'read'}
          title={'title'}
          tags={['#tag1', '#tag2']}
          status="done"
          time={new Date()}
        />
        <InfoBanner status={'readDone'} />
      </div>
    </div>
  );
}

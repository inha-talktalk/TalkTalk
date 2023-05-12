import { useRecoilState } from 'recoil';
import { style } from './style';
import { selectedChannelState } from '@/states/groupStudy';

export default function GroupStudyChannel() {
  const [selected, setSelected] = useRecoilState(selectedChannelState);

  return (
    <div css={style.container}>
      <p>채널</p>
      <div css={style.select(selected)}>
        <p className="general" onClick={() => setSelected('general')}>
          <span>#</span> 일반
        </p>
        <p className="share" onClick={() => setSelected('share')}>
          <span>#</span> 공유
        </p>
      </div>
    </div>
  );
}

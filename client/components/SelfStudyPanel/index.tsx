import SelfStudyPanelRead from './SelfStudyPanelRead';
import SelfStudyPanelReadDone from './SelfStudyPanelReadDone';
import SelfStudyPanelWrite from './SelfStudyPanelWrite';
import SelfStudyPanelWriteDone from './SelfStudyPanelWriteDone';

interface SelfStudyPanelProps {
  type: 'read' | 'write' | 'readDone' | 'writeDone';
  script: SelfStudyScriptResponse | null;
}

export default function SelfStudyPanel({ type, script }: SelfStudyPanelProps) {
  if (type === 'read') {
    return <SelfStudyPanelRead script={script} />;
  } else if (type === 'write') {
    return <SelfStudyPanelWrite script={script} />;
  } else if (type === 'readDone') {
    return <SelfStudyPanelReadDone script={script} />;
  } else if (type === 'writeDone') {
    return <SelfStudyPanelWriteDone script={script} />;
  }

  return <></>;
}

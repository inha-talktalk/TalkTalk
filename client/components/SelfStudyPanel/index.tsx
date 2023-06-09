import SelfStudyPanelRead from './SelfStudyPanelRead';
import SelfStudyPanelReadDone from './SelfStudyPanelReadDone';
import SelfStudyPanelWrite from './SelfStudyPanelWrite';
import SelfStudyPanelWriteDone from './SelfStudyPanelWriteDone';

interface SelfStudyPanelProps {
  type: 'read' | 'write' | 'readDone' | 'writeDone';
  script: SelfStudyScriptResponse | null;
  answers?: SelfStudyReadAnswer[] | SelfStudyWriteAnswer;
}

export default function SelfStudyPanel({ type, script, answers }: SelfStudyPanelProps) {
  if (type === 'read') {
    return <SelfStudyPanelRead script={script} />;
  } else if (type === 'write') {
    return <SelfStudyPanelWrite script={script} />;
  } else if (type === 'readDone') {
    if (!answers) return <></>;
    return <SelfStudyPanelReadDone script={script} answers={answers as SelfStudyReadAnswer[]} />;
  } else if (type === 'writeDone') {
    if (!answers) return <></>;
    return <SelfStudyPanelWriteDone script={script} answers={answers as SelfStudyWriteAnswer} />;
  }

  return <></>;
}

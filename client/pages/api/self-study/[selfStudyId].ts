import { NextApiRequest, NextApiResponse } from 'next';

const selfStudy: SelfStudy = {
  userId: '1',
  selfStudyName: '제목',
  selfStudyId: '2',
  files: [],
  duration: 1000,
  tags: ['# 태그1', '# 태그2'],
  script: [
    'Friend 1: Hey! Long time no see, how have you been?',
    `Friend 2: Hey, yeah it's been ages! I've been good, thanks for asking. How about you?`,
    'Friend 1: Hey! Long time no see, how have you been?',
  ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse<SelfStudyResponse>) {
  if (req.method === 'GET') {
    res.status(200).json(selfStudy);
  }
}

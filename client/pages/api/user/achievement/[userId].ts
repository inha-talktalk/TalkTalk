import { NextApiRequest, NextApiResponse } from 'next';

const userAchievement = {
  teamMateCount: 12,
  studyLanguageCount: 2,
  joinTime: '2023-03-07T05:46:54.801Z',
  completedSelfStudyCount: 32,
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserAcheivementResponse>,
) {
  if (req.method === 'GET') {
    res.status(200).json(userAchievement);
  }
}

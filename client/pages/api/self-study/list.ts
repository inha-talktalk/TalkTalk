import { NextApiRequest, NextApiResponse } from 'next';

const list: SelfStudyList = {
  selfStudyIds: ['1', '2', '3'],
};

export default function handler(req: NextApiRequest, res: NextApiResponse<SelfStudyListResponse>) {
  if (req.method === 'GET') {
    res.status(200).json(list);
  }
}

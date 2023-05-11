import { NextApiRequest, NextApiResponse } from 'next';

const languages = [
  {
    label: '영어',
    id: 'en',
  },
  {
    label: '한국어',
    id: 'ko',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.json(languages);
  }
}

import { NextApiRequest, NextApiResponse } from 'next';

const user = {
  userName: '이민규',
  nickName: 'dolphinlmg',
  email: 'dolphinlmg@naver.com',
  profileIconUrl: '',
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(user);
  }
}

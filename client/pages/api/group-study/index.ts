import { NextApiRequest, NextApiResponse } from 'next';

const data: GroupStudySearchResponse = {
  groupIds: [
    '612a4eb63181e433dec2da51',
    '612a4eb63181e433dec2da52',
    '612a4eb63181e433dec2da53',
    '612a4eb63181e433dec2da53',
    '612a4eb63181e433dec2da53',
  ],
  totalPage: 15,
  currentPage: 1,
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GroupStudySearchResponse>,
) {
  if (req.method === 'GET') {
    res.status(200).json(data);
  }
  if (req.method === 'POST') {
    res.redirect('http://localhost:8080/group-study');
  }
}

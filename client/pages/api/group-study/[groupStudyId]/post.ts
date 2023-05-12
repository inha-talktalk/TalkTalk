import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<GroupStudyPostResponse>) {
  if (req.method === 'GET') {
    res.status(200).json({
      state: 'ongoing',
      groupId: 'test',
      languageId: 'qwer',
      groupName: 'groupName',
      groupPersonnel: 3,
      tags: ['# 태그1', '# 태그2'],
      introduction:
        '안녕하세요. 개인적으로 네명정도 토익 스피킹 스터디 진행하실 분 모십니다. 매주 2일 스터디를 진행할 예정이며 현재 2명 모집되었습니다. 앞으로 두...',
      groupDuration: new Date().toISOString(),
      ownerId: '644bc8254d0b4e03eb31c7c7',
      isFinished: false,
      createdAt: new Date().toISOString(),
    });
  }
}

'use client';

import type { StudyMember } from '@hiarc-platform/shared';
import { Button } from '../button';
import { StudentListItem } from './student-list-item';
import { Title } from '../label/title';
import { DialogUtil } from '../../utils/dialog-util';

interface StudyUnassignedGroupProps {
  isAdmin?: boolean;
  studyId: number;
  onWithdraw?(studyId: number, memberId: number): void;
  members: StudyMember[];
  onAddGroup?(): void;
  onChangeStatus?(studyId: number, memberId: number): void;
}

export function StudyUnassignedGroup({
  isAdmin = false,
  members,
  onAddGroup,
  studyId,
  onWithdraw,
  onChangeStatus,
}: StudyUnassignedGroupProps): React.ReactElement {
  const handleWithdraw = async (memberId: number): Promise<void> => {
    if (studyId && onWithdraw) {
      const confirmed = await DialogUtil.confirm(
        '정말로 이 학생을 스터디에서 탈퇴시키시겠습니까?',
        {
          title: '학생 탈퇴 확인',
          confirmText: '확인',
          cancelText: '취소',
        }
      );

      if (confirmed) {
        onWithdraw(studyId, memberId);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4">
        <Title size="xs" weight="bold">
          (조없음)
        </Title>
        <Button className="bg-primary-200" variant="fill" size="xs" onClick={onAddGroup}>
          조 추가
        </Button>
      </div>

      {members.length > 0 && (
        <div className="mt-4 space-y-2">
          {members.map((member, index) => (
            <StudentListItem
              key={member.memberId || index}
              isAdmin={isAdmin}
              name={member.memberName || '이름 없음'}
              bojHandle={member.bojHandle || '핸들 없음'}
              attendanceCount={member.attendanceCount || 0}
              assignmentCount={member.assignmentCount || 0}
              totalRounds={member.totalRounds || 0}
              onWithdraw={() => {
                handleWithdraw(member.memberId || 0);
              }}
              roundStatuses={member.roundStatuses || []}
              onChangeStatus={() => {
                if (onChangeStatus) {
                  onChangeStatus(studyId, member.memberId || 0);
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

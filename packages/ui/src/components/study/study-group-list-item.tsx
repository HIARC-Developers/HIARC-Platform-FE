'use client';

import { useState } from 'react';
import type { StudyGroup } from '@hiarc-platform/shared';
import { Button } from '../button';
import { IconButton } from '../icon-button';
import { Label } from '../label/label';
import { SlideFade } from '../animation/slide-fade';
import { StudentListItem } from './student-list-item';
import { DialogUtil } from '../../utils/dialog-util';

interface StudyGroupListItemProps {
  studyGroup: StudyGroup;
  studyId: number;
  isAdmin?: boolean;
  onEdit?(groupId: number, groupData: StudyGroup): void;
  onDelete?(groupId: number): void;
  onWithdraw?(studyId: number, memberId: number): void;
  onChangeStatus?(studyId: number, memberId: number): void;
}

export function StudyGroupListItem({
  studyGroup,
  studyId,
  isAdmin = false,
  onEdit,
  onDelete,
  onWithdraw,
  onChangeStatus,
}: StudyGroupListItemProps): React.ReactElement {
  const [open, setOpen] = useState(false);

  const handleEdit = (): void => {
    if (studyGroup.groupId && onEdit) {
      onEdit(studyGroup.groupId, studyGroup);
    }
  };

  const handleDelete = (): void => {
    if (studyGroup.groupId && onDelete) {
      onDelete(studyGroup.groupId);
    }
  };

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
        console.log('Calling onWithdraw with:', { studyId, memberId });
        onWithdraw(studyId, memberId);
      }
    }
  };

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 px-5 py-4 transition">
      <div className="flex items-center gap-4">
        <Label size="lg" weight="medium">
          {studyGroup.groupName || '조명 없음'}
        </Label>
        <IconButton
          size="lg"
          iconSrc={open ? '/shared-assets/CaretUp.svg' : '/shared-assets/CaretDown.svg'}
          aria-label="토글 상세"
          onClick={() => setOpen((toggle) => !toggle)}
        />
        <Button variant="secondary" size="xs" onClick={handleEdit}>
          수정
        </Button>
        <Button variant="secondary" size="xs" onClick={handleDelete}>
          삭제
        </Button>
      </div>

      {open && studyGroup.students && studyGroup.students.length > 0 && (
        <SlideFade key="students" className="w-full">
          <div className="mt-4 space-y-2">
            {studyGroup.students.map((student, index) => (
              <StudentListItem
                key={student.memberId || index}
                isAdmin={isAdmin}
                name={student.memberName || ''}
                bojHandle={student.bojHandle || ''}
                attendanceCount={student.attendanceCount || 0}
                assignmentCount={student.assignmentCount || 0}
                totalRounds={student.totalRounds || 0}
                roundStatuses={student.roundStatuses || []}
                onWithdraw={() => handleWithdraw(student.memberId || 0)}
                onChangeStatus={() => {
                  onChangeStatus && onChangeStatus(studyId, student.memberId || 0);
                }}
              />
            ))}
          </div>
        </SlideFade>
      )}
    </div>
  );
}

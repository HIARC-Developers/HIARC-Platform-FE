import { StudyMember } from '@hiarc-platform/shared';
import { DialogUtil, StudentListItem } from '@hiarc-platform/ui';

interface StudentListProps {
  studyId: number;
  studentList: StudyMember[];
  onWithdraw?(studyId: number, memberId: number): void;
}

export function StudentList({
  studentList,
  studyId,
  onWithdraw,
}: StudentListProps): React.ReactElement {
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
    <div className="flex flex-col gap-4">
      {studentList.map((student) => (
        <StudentListItem
          key={student.memberId}
          onWithdraw={() => {
            handleWithdraw(student.memberId || 0);
          }}
          bojHandle={student.bojHandle || ''}
          name={student.memberName || ''}
          attendanceCount={student.attendanceCount || 0}
          assignmentCount={student.assignmentCount || 0}
          totalRounds={student.totalRounds || 0}
          roundStatuses={student.roundStatuses || []}
        />
      ))}
    </div>
  );
}

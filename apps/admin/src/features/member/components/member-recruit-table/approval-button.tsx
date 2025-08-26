import { useCurrentSemester } from '@/features/semester/hooks/use-current-semester';
import { useSelectedSemester } from '@/shared/hooks/use-semester-store';
import { StudentApply } from '@hiarc-platform/shared';
import { Button, Label } from '@hiarc-platform/ui';
import { ReactElement } from 'react';
import { useUpdateMemberApply } from '../../hooks';

export function ApprovalButton({
  studentApply,
}: {
  studentApply: StudentApply;
}): ReactElement | null {
  const { selectedSemesterId } = useSelectedSemester();
  const { data: currentSemester } = useCurrentSemester();
  const { mutate: updateStudentApply } = useUpdateMemberApply();

  const isCurrentSemesterSelected =
    selectedSemesterId === currentSemester?.currentSemester?.semesterId?.toString();

  // 디버깅: 조건을 임시로 제거하여 버튼이 항상 렌더링되도록 함
  // if (!isCurrentSemesterSelected) {
  //   return null;
  // }

  const isApproved = studentApply.applicationStatus === 'APPROVED';

  return (
    <Button
      className={`relative z-10 w-full ${isApproved ? 'border-primary-100 text-primary-100' : 'bg-primary-100'}`}
      size="xs"
      variant={isApproved ? 'line' : 'fill'}
      onClick={(event) => {
        event.stopPropagation();
        if (isApproved) {
          updateStudentApply({
            semesterId: Number(selectedSemesterId),
            memberId: studentApply.memberId ?? 0,
            applicationStatus: 'PENDING_APPROVAL',
          });
        } else {
          updateStudentApply({
            semesterId: Number(selectedSemesterId),
            memberId: studentApply.memberId ?? 0,
            applicationStatus: 'APPROVED',
          });
        }
      }}
    >
      <Label size="md">{isApproved ? '철회하기' : '승인하기'}</Label>
    </Button>
  );
}

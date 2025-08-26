'use client';

import { ShowAssignmentDialog } from '@hiarc-platform/ui';
import { useAssignment } from '../../hooks/study-member/query/use-assignment';

interface ShowAssignmentDialogWrapperProps {
  studyId: number;
  lectureId: number;
}

export function ShowAssignmentDialogWrapper({
  studyId,
  lectureId,
}: ShowAssignmentDialogWrapperProps): React.ReactElement {
  const assignmentQuery = useAssignment(studyId, lectureId);

  return (
    <ShowAssignmentDialog
      assignment={assignmentQuery.data}
      isLoading={assignmentQuery.isLoading}
      error={assignmentQuery.error}
      fetchAssignment={() => assignmentQuery.refetch()}
    />
  );
}

'use client';

import { useAssignment } from '../../hooks/use-assignment';
import { ShowAssignmentDialog } from '@hiarc-platform/ui';

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
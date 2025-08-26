import { DoAssignmentDialog } from '@hiarc-platform/ui';
import { useAssignment } from '../../hooks/study-member/query/use-assignment';

interface DoAssignmentDialogWrapperProps {
  studyId: number;
  lectureId: number;
  lectureRound: number;
}

export function DoAssignmentDialogWrapper({
  studyId,
  lectureId,
  lectureRound,
}: DoAssignmentDialogWrapperProps): React.ReactElement {
  const { data: assignment, isLoading } = useAssignment(studyId, lectureId);

  return (
    <DoAssignmentDialog
      studyId={studyId}
      lectureId={lectureId}
      assignment={assignment}
      isLoading={isLoading}
      lectureRound={lectureRound}
    />
  );
}

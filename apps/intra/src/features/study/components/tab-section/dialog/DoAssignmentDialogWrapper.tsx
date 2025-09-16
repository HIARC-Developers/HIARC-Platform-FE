import { useAssignment } from '@/features/study/hooks';
import { DoAssignmentDialog } from '@hiarc-platform/ui';

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
    <DoAssignmentDialog assignment={assignment} isLoading={isLoading} lectureRound={lectureRound} />
  );
}

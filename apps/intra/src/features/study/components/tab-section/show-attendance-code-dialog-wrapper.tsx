'use client';

import { ShowAttendanceCodeDialog } from '@hiarc-platform/ui';
import { useAttendanceCode } from '../../hooks/study-instructor/query/use-attendance-code';

interface ShowAttendanceCodeDialogWrapperProps {
  studyId: number;
  lectureId: number;
  studyName?: string;
  round?: number;
  lectureName?: string;
}

export function ShowAttendanceCodeDialogWrapper({
  studyId,
  lectureId,
  studyName,
  round,
  lectureName,
}: ShowAttendanceCodeDialogWrapperProps): React.ReactElement {
  const attendanceCodeQuery = useAttendanceCode(studyId, lectureId);

  return (
    <ShowAttendanceCodeDialog
      studyId={studyId}
      lectureId={lectureId}
      studyName={studyName}
      round={round}
      lectureName={lectureName}
      attendanceCode={attendanceCodeQuery.data}
      isLoading={attendanceCodeQuery.isLoading}
      error={attendanceCodeQuery.error}
      fetchAttendanceCode={() => attendanceCodeQuery.refetch()}
    />
  );
}

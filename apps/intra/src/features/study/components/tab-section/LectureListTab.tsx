import { DialogUtil, LectureList } from '@hiarc-platform/ui';
import { Lecture } from '@hiarc-platform/shared';

import { CreateAttendanceCodeDialogWrapper } from './dialog/CreateAttendanceCodeDialogWrapper';
import { useRouter } from 'next/navigation';
import { ShowAttendanceCodeDialogWrapper } from './dialog/ShowAttendanceCodeDialogWrapper';
import { CreateAssignmentDialogWrapper } from './dialog/CreateAssignmentDialogWrapper';
import { useDeleteLecture } from '../../hooks/study-instructor/mutation/use-delete-lecture';
import { CheckAttendanceCodeDialog } from './dialog/CheckAttendanceCodeDialog';
import { DoAssignmentDialogWrapper } from './dialog/DoAssignmentDialogWrapper';

interface LectureListTabProps {
  isAdmin?: boolean;
  isStudent?: boolean;
  studyId?: number;
  lectureList?: Lecture[];
  className?: string;
  studyName?: string;
  semesterId?: number;
}

export function LectureListTab({
  isAdmin,
  isStudent,
  className,
  lectureList,
  studyId,
  studyName,
  semesterId,
}: LectureListTabProps): React.ReactElement {
  const router = useRouter();
  const { mutate: deleteLecture } = useDeleteLecture();

  const handleTitleClick = (lecture: Lecture): void => {
    if (!lecture.announcementId) {
      console.error('강의 상세보기 실패: announcementId가 없습니다.');
      return;
    }
    router.push(`/announcement/${lecture.announcementId}`);
  };

  const handleCreateAttendanceClick = (lecture: Lecture): void => {
    DialogUtil.showComponent(
      <CreateAttendanceCodeDialogWrapper
        studyId={studyId ?? 0}
        lectureId={lecture.round ?? 0}
        studyName={studyName}
        round={lecture.round ?? 0}
        lectureName={lecture.title ?? ''}
      />
    );
  };

  const handleShowAttendanceClick = (lecture: Lecture): void => {
    DialogUtil.showComponent(
      <ShowAttendanceCodeDialogWrapper
        studyId={studyId ?? 0}
        lectureId={lecture.round ?? 0}
        studyName={studyName}
        round={lecture.round ?? 0}
        lectureName={lecture.title ?? ''}
      />
    );
  };

  const handleCreateAssignmentClick = (lecture: Lecture, onSuccess?: () => void): void => {
    DialogUtil.showComponent(
      <CreateAssignmentDialogWrapper
        studyId={studyId ?? 0}
        lectureId={lecture.round ?? 0}
        isUpdate={false}
        onSuccess={onSuccess}
      />
    );
  };

  const handleShowAssignmentClick = (lecture: Lecture): void => {
    DialogUtil.showComponent(
      <CreateAssignmentDialogWrapper
        studyId={studyId ?? 0}
        lectureId={lecture.round ?? 0}
        isUpdate={true}
      />
    );
  };

  const handleCheckAttendanceClick = (lecture: Lecture): void => {
    DialogUtil.showComponent(
      <CheckAttendanceCodeDialog
        studyId={studyId ?? 0}
        lectureRound={lecture.round ?? 0}
        lectureName={lecture.title ?? ''}
        studyName={studyName}
      />
    );
  };

  const handleDoAssignmentClick = (lecture: Lecture) => {
    DialogUtil.showComponent(
      <DoAssignmentDialogWrapper
        studyId={studyId ?? 0}
        lectureRound={lecture.round ?? 0}
        lectureId={lecture.round ?? 0}
      />
    );
  };

  const handleEditClick = (lecture: Lecture): void => {
    if (!lecture.announcementId) {
      console.error('강의 수정 실패: announcementId가 없습니다.');
      return;
    }

    const params = new URLSearchParams();
    if (studyId) {
      params.set('studyId', studyId.toString());
    }
    if (semesterId) {
      params.set('semesterId', semesterId.toString());
    }
    params.set('isLecture', 'true');

    router.push(`/announcement/${lecture.announcementId}/edit?${params.toString()}`);
  };

  const handleDeleteClick = (lecture: Lecture): void => {
    if (!lecture.announcementId) {
      console.error('강의 삭제 실패: announcementId가 없습니다.');
      return;
    }

    DialogUtil.showConfirm('정말로 삭제하시겠습니까?', () => {
      deleteLecture({
        studyId: studyId ?? 0,
        announcementId: lecture.announcementId!,
      });
    });
  };

  return (
    <LectureList
      className={className}
      isAdmin={isAdmin}
      isStudent={isStudent}
      lectureList={lectureList}
      studyId={studyId}
      studyName={studyName}
      semesterId={semesterId}
      onTitleClick={handleTitleClick}
      onCreateAttendanceClick={handleCreateAttendanceClick}
      onShowAttendanceClick={handleShowAttendanceClick}
      onCreateAssignmentClick={handleCreateAssignmentClick}
      onShowAssignmentClick={handleShowAssignmentClick}
      onAttendanceCheckClick={handleCheckAttendanceClick}
      onDoAssignmentClick={handleDoAssignmentClick}
      onEditClick={handleEditClick}
      onDeleteClick={handleDeleteClick}
    />
  );
}

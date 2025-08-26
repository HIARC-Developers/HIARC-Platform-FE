import { cn, CreateAttendanceCodeDialog, DialogUtil, LectureListItem } from '@hiarc-platform/ui';
import { Lecture } from '@hiarc-platform/shared';
import { useCreateAttendanceCode, useDeleteLecture } from '../../hooks';
import { ShowAttendanceCodeDialogWrapper } from './show-attendance-code-dialog-wrapper';
import { CreateAssignmentDialogWrapper } from './create-assignment-dialog-wrapper';
import { useRouter } from 'next/navigation';

interface LectureListProps {
  studyId?: number;
  lectureList?: Lecture[];
  className?: string;
  studyName?: string;
}

export function LectureList({
  className,
  lectureList,
  studyId,
  studyName,
}: LectureListProps): React.ReactElement {
  const router = useRouter();
  const { mutate: createAttendanceCode } = useCreateAttendanceCode();
  const { mutate: deleteLecture } = useDeleteLecture();

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      {lectureList?.map((lecture) => (
        <LectureListItem
          isAdmin
          key={lecture.round}
          lecture={lecture}
          onTitleClick={() => {}}
          onCreateAttendanceClick={(onSuccess) => {
            DialogUtil.showComponent(
              <CreateAttendanceCodeDialog
                studyName={studyName ?? ''}
                round={lecture.round ?? 0}
                lectureName={lecture.title ?? ''}
                onCreateAttendance={(attendanceCode: string) => {
                  createAttendanceCode(
                    {
                      studyId: studyId ?? 0,
                      lectureId: lecture.round ?? 0,
                      code: attendanceCode,
                    },
                    {
                      onSuccess: () => {
                        onSuccess();
                      },
                      onError: (error) => {
                        console.error('출석 코드 생성 실패:', error);
                        // 에러 발생 시 onSuccess를 호출하지 않음
                      },
                    }
                  );
                }}
              />
            );
          }}
          onShowAttendanceClick={() => {
            DialogUtil.showComponent(
              <ShowAttendanceCodeDialogWrapper
                studyId={studyId ?? 0}
                lectureId={lecture.round ?? 0}
              />
            );
          }}
          onCreateAssignmentClick={(onSuccess) => {
            DialogUtil.showComponent(
              <CreateAssignmentDialogWrapper
                studyId={studyId ?? 0}
                lectureId={lecture.round ?? 0}
                isUpdate={false}
                onSuccess={onSuccess}
              />
            );
          }}
          onShowAssignmentClick={() => {
            DialogUtil.showComponent(
              <CreateAssignmentDialogWrapper
                studyId={studyId ?? 0}
                lectureId={lecture.round ?? 0}
                isUpdate={true}
              />
            );
          }}
          onEditClick={() => {
            if (!lecture.announcementId) {
              console.error('강의 수정 실패: announcementId가 없습니다.');
              return;
            }

            router.push(`/announcement/${lecture.announcementId}/edit`);
          }}
          onDeleteClick={() => {
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
          }}
        />
      ))}
    </div>
  );
}

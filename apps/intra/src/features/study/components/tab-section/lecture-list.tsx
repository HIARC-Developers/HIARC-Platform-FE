import {
  AttendanceCheckDialog,
  cn,
  CreateAttendanceCodeDialog,
  DialogUtil,
  LectureListItem,
} from '@hiarc-platform/ui';
import { Lecture } from '@hiarc-platform/shared';

import { ShowAttendanceCodeDialogWrapper } from './show-attendance-code-dialog-wrapper';
import { CreateAssignmentDialogWrapper } from './create-assignment-dialog-wrapper';
import { DoAssignmentDialogWrapper } from './do-assignment-dialog-wrapper';
import { useRouter } from 'next/navigation';
import { useCreateAttendanceCode } from '../../hooks/study-instructor/mutation/use-create-attendance-code';
import { useDeleteLecture } from '../../hooks/study-instructor/mutation/use-delete-lecture';
import { useCheckAttendanceCode } from '../../hooks/study-member/mutation/use-check-attendance-code';

interface LectureListProps {
  isAdmin?: boolean;
  isStudent?: boolean;
  studyId?: number;
  lectureList?: Lecture[];
  className?: string;
  studyName?: string;
  semesterId?: number;
}

export function LectureList({
  isAdmin,
  isStudent,
  className,
  lectureList,
  studyId,
  studyName,
  semesterId,
}: LectureListProps): React.ReactElement {
  const router = useRouter();
  const { mutate: createAttendanceCode } = useCreateAttendanceCode();
  const { mutate: deleteLecture } = useDeleteLecture();
  const { mutate: checkAttendanceCode } = useCheckAttendanceCode();

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      {lectureList && lectureList.length > 0 ? (
        lectureList.map((lecture) => (
          <LectureListItem
            isAdmin={isAdmin}
            isStudent={isStudent}
            key={lecture.round}
            lecture={lecture}
            onTitleClick={() => {}}
            onAttendanceCheckClick={() => {
              DialogUtil.showComponent(
                <AttendanceCheckDialog
                  studyName={studyName ?? ''}
                  round={lecture.round ?? 0}
                  lectureName={lecture.title ?? ''}
                  onCheckAttendance={(attendanceCode: string) => {
                    checkAttendanceCode({
                      studyId: studyId ?? 0,
                      lectureRound: lecture.round ?? 0,
                      attendanceCode,
                    });
                  }}
                />
              );
            }}
            onDoAssignmentClick={() => {
              DialogUtil.showComponent(
                <DoAssignmentDialogWrapper
                  studyId={studyId ?? 0}
                  lectureId={lecture.round ?? 0}
                  lectureRound={lecture.round ?? 0}
                />
              );
            }}
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

              const params = new URLSearchParams();
              if (studyId) {
                params.set('studyId', studyId.toString());
              }
              if (semesterId) {
                params.set('semesterId', semesterId.toString());
              }

              router.push(`/announcement/${lecture.announcementId}/edit?${params.toString()}`);
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
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">커리큘럼이 없습니다.</div>
      )}
    </div>
  );
}

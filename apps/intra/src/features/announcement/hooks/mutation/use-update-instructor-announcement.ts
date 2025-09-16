import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DialogUtil } from '@hiarc-platform/ui';
import { UpdateAnnouncementRequest } from '../../types/request/update-announcement-request';
import { announcementApi } from '../../api/announcement';
import { useRouter } from 'next/navigation';

export const useUpdateInstructorAnnouncement = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      studyId,
      announcementId,
      data,
    }: {
      studyId: number;
      announcementId: number;
      data: UpdateAnnouncementRequest;
    }) => announcementApi.UPDATE_INSTRUCTOR_ANNOUNCEMENT(studyId, announcementId, data),
    onSuccess: (_, { studyId, announcementId }) => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      queryClient.invalidateQueries({ queryKey: ['announcement', announcementId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['study', studyId] });
      DialogUtil.showSuccess('공지사항이 성공적으로 수정되었습니다.', () => {
        const targetStudyId = studyId;
        if (targetStudyId) {
          router.push(`/study/${studyId}`);
        } else {
          router.back();
        }
      });
    },
  });
};

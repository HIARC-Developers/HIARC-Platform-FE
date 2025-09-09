import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { Announcement } from '@hiarc-platform/shared';
import { CreateAnnouncementRequest } from '@hiarc-platform/shared';
import { announcementApi } from '@/features/announcement/api/announcement';
import { DialogUtil } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';

interface CreateStudyAnnouncementParams {
  studyId: number;
  announcementData: CreateAnnouncementRequest;
}

type MutationInput = CreateAnnouncementRequest | CreateStudyAnnouncementParams;

export default function useCreateStudyAnnouncement(): UseMutationResult<
  Announcement,
  Error,
  MutationInput,
  unknown
> {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: MutationInput) => {
      if ('studyId' in data && 'announcementData' in data) {
        return announcementApi.CREATE_STUDY_ANNOUNCEMENT(data.studyId, data.announcementData);
      } else {
        return announcementApi.CREATE_ANNOUNCEMENT(data);
      }
    },
    onSuccess: (newAnnouncement, variables) => {
      if ('studyId' in variables && 'announcementData' in variables) {
        queryClient.invalidateQueries({ queryKey: ['studies', { studyId: variables.studyId }] });
      }
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      DialogUtil.showSuccess('공지사항이 성공적으로 생성되었습니다.', () => {
        router.back();
      });
    },
  });

  return mutation;
}

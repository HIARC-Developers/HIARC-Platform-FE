import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { announcementApi } from '../../announcement/api/announcement';
import { Announcement } from '@hiarc-platform/shared';
import { CreateAnnouncementRequest } from '@hiarc-platform/shared';

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

  const mutation = useMutation({
    mutationFn: (data: MutationInput) => {
      if ('studyId' in data && 'announcementData' in data) {
        return announcementApi.CREATE_STUDY_ANNOUNCEMENT(data.studyId, data.announcementData);
      } else {
        return announcementApi.CREATE_ANNOUNCEMENT(data);
      }
    },
    onSuccess: (newAnnouncement, variables) => {
      console.log('[HOOK] useCreateStudyAnnouncement 성공:', newAnnouncement);

      if ('studyId' in variables && 'announcementData' in variables) {
        queryClient.invalidateQueries({ queryKey: ['studies', { studyId: variables.studyId }] });
      }
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
    onError: (error) => {
      console.error('[HOOK] useCreateStudyAnnouncement 에러:', error);
    },
  });

  return mutation;
}

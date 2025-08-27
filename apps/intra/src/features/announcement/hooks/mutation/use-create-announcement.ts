import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Announcement } from '@hiarc-platform/shared';
import { CreateAnnouncementRequest } from '@hiarc-platform/shared';
import { announcementApi } from '../../api/announcement';

export default function useCreateAnnouncement(): UseMutationResult<
  Announcement,
  Error,
  CreateAnnouncementRequest,
  unknown
> {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: announcementApi.CREATE_ANNOUNCEMENT,
    onSuccess: (newAnnouncement) => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      router.push(`/announcement/${newAnnouncement.announcementId}`);
    },
  });

  return mutation;
}

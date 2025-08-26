import { useMutation, useQueryClient } from '@tanstack/react-query';
import { announcementApi } from '../api/announcement';

import { UseMutationResult } from '@tanstack/react-query';
import { CreateAnnouncementRequest } from '@hiarc-platform/shared';

export const useCreateAdminAnnouncement = (): UseMutationResult<
  unknown,
  unknown,
  CreateAnnouncementRequest
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAnnouncementRequest) =>
      announcementApi.CREATE_ADMIN_ANNOUNCEMENT(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      queryClient.invalidateQueries({ queryKey: ['lectures'] });
    },
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { announcementApi } from '../api/announcement';

import { UseMutationResult } from '@tanstack/react-query';

export const useDeleteAdminAnnouncement = (): UseMutationResult<unknown, unknown, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => announcementApi.DELETE_ADMIN_ANNOUNCEMENT(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
    },
  });
};

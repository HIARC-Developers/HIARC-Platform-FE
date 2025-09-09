import { useMutation, useQueryClient } from '@tanstack/react-query';
import { announcementApi } from '../api/announcement';

import { UseMutationResult } from '@tanstack/react-query';
import { DialogUtil } from '@hiarc-platform/ui';

export const useDeleteAdminAnnouncement = (): UseMutationResult<unknown, unknown, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => announcementApi.DELETE_ADMIN_ANNOUNCEMENT(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      DialogUtil.showSuccess('삭제되었습니다.');
    },
  });
};

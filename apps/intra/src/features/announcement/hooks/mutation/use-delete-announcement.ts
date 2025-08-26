import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { announcementApi } from '../../api/announcement';

export default function useDeleteAnnouncement(): UseMutationResult<void, Error, string, unknown> {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: announcementApi.DELETE_ANNOUNCEMENT,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      queryClient.removeQueries({ queryKey: ['announcement', deletedId] });
      router.push('/announcement');
    },
  });

  return mutation;
}

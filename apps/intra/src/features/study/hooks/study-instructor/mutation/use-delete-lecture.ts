import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { DialogUtil } from '@hiarc-platform/ui';
import { studyInstructorApi } from '@/features/study/api';

export function useDeleteLecture(): UseMutationResult<
  void,
  Error,
  { studyId: number; announcementId: number },
  unknown
> {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ studyId, announcementId }: { studyId: number; announcementId: number }) =>
      studyInstructorApi.DELETE_LECTURE(studyId, announcementId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lectures'] });
      DialogUtil.showSuccess('강의가 성공적으로 삭제되었습니다.');
    },
  });

  return mutation;
}

import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { DialogUtil } from '@hiarc-platform/ui';

export default function useApplyToStudy(): UseMutationResult<void, Error, number, unknown> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: studyApi.APPLY_TO_STUDY,
    onSuccess: (_, studyId) => {
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      queryClient.invalidateQueries({ queryKey: ['studies', studyId] });
      queryClient.invalidateQueries({ queryKey: ['members', 'me', 'studies'] });
      DialogUtil.showSuccess('스터디 신청이 완료되었습니다.');
    },
  });
}

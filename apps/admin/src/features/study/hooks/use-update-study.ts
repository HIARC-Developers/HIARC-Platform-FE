import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import type { UpdateStudyRequest } from '../api/study';
import { DialogUtil } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';

interface UpdateStudyParams {
  studyId: number;
  data: UpdateStudyRequest;
}

export function useUpdateStudy(): UseMutationResult<void, Error, UpdateStudyParams, unknown> {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ studyId, data }: UpdateStudyParams) => studyApi.UPDATE_STUDY(studyId, data),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      queryClient.invalidateQueries({ queryKey: ['study', variables.studyId] });
      DialogUtil.showSuccess('스터디가 성공적으로 수정되었습니다.', () => {
        router.push(`/study/${variables.studyId}`);
      });
    },
  });

  return mutation;
}

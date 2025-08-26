import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { studyApi } from '../api/study';
import { DialogUtil } from '@hiarc-platform/ui';
import { CreateStudyRequest, Study } from '@hiarc-platform/shared';

export function useCreateStudy(): UseMutationResult<Study, Error, CreateStudyRequest, unknown> {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: studyApi.CREATE_STUDY,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      DialogUtil.showSuccess('스터디가 성공적으로 생성되었습니다.');
      router.push(`/study/${response.studyId}`);
    },
  });

  return mutation;
}

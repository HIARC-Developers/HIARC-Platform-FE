import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { DialogUtil } from '@hiarc-platform/ui';
import { queryKeys, mutationKeys } from '@/shared/constants/query-keys';
import { studyInstructorApi } from '@/features/study/api';
import { UpdateStudyRequest } from '@/features/study/api/study-instructor';

interface UpdateStudyParams {
  studyId: number;
  data: UpdateStudyRequest;
}

export function useUpdateStudy(): UseMutationResult<void, Error, UpdateStudyParams, unknown> {
  const mutation = useMutation({
    mutationKey: mutationKeys.studies.update,
    mutationFn: ({ studyId, data }: UpdateStudyParams) =>
      studyInstructorApi.UPDATE_STUDY(studyId, data),
    meta: {
      invalidateQueries: [queryKeys.studies.all, queryKeys.studies.detail],
    },
    onSuccess: () => {
      DialogUtil.showSuccess('스터디 정보가 성공적으로 수정되었습니다.');
    },
  });

  return mutation;
}

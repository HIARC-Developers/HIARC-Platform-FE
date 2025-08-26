import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { DialogUtil } from '@hiarc-platform/ui';
import { studyInstructorApi } from '@/features/study/api';

export function useCreateAttendanceCode(): UseMutationResult<
  void,
  Error,
  { studyId: number; lectureId: number; code: string },
  unknown
> {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      studyId,
      lectureId,
      code,
    }: {
      studyId: number;
      lectureId: number;
      code: string;
    }) => studyInstructorApi.CREATE_ATTENDANCE_CODE(studyId, lectureId, code),
    onSuccess: () => {
      DialogUtil.showSuccess('출석 코드가 성공적으로 등록되었습니다.');

      // 관련 쿼리들 무효화하여 최신 데이터 반영
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      queryClient.invalidateQueries({ queryKey: ['lectures'] });
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
    },
  });

  return mutation;
}

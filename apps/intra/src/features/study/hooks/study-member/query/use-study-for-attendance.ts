import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { useEffect } from 'react';

import { AttendanceableStudy } from '../../../types/request/attendanceable-study';
import { studyMemberApi } from '@/features/study/api';
import { DialogUtil } from '@hiarc-platform/ui';

export function useStudyForAttendance(): UseQueryResult<AttendanceableStudy, Error> {
  const query = useQuery({
    queryKey: ['attendanceable'],
    queryFn: () => studyMemberApi.GET_STUDY_FOR_ATTENDANCE(),
    placeholderData: keepPreviousData,
    staleTime: 0, // 항상 최신 데이터 가져오도록 설정
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true, // 페이지 포커스 시 자동 갱신
    refetchOnMount: true, // 컴포넌트 마운트 시 자동 갱신
    retry: false,
  });

  useEffect(() => {
    if (query.error) {
      DialogUtil.hideAllDialogs();
      DialogUtil.showServerError(query.error);
    }
  }, [query.error]);

  return query;
}

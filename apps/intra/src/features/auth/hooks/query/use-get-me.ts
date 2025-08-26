import { useQuery, UseQueryResult, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { MyInfo } from '../../types/model/my-info';
import { useAuthStore } from '@/shared/store/auth-store';
import { authApi } from '../../api/auth';
import { queryKeys } from '@/shared/constants/query-keys';

export default function useGetMe(): UseQueryResult<MyInfo, Error> {
  const { isAuthenticated, clearAuth } = useAuthStore();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: authApi.GET_ME,
    enabled: isAuthenticated, // 인증된 상태에서만 실행
    retry: false,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청 방지
    refetchOnReconnect: false, // 재연결 시 재요청 방지
    refetchOnMount: false, // 마운트 시 재요청 방지
  });

  // 로그아웃 시 쿼리 캐시 즉시 제거
  useEffect(() => {
    if (!isAuthenticated) {
      queryClient.removeQueries({ queryKey: queryKeys.auth.me() });
    }
  }, [isAuthenticated, queryClient]);

  useEffect(() => {
    if (query.error && isAuthenticated) {
      clearAuth();
    }
  }, [query.error, clearAuth, isAuthenticated]);

  return query;
}

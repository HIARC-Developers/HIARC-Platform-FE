import React from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { authApi, RecruitApplicationResponse, SignupRequest } from '../../api/auth';
import { DialogUtil } from '@hiarc-platform/ui';
import { GreetingDialog } from '../../components/dialog/greeting-dialog';
import { useAuthStore } from '@/shared/store/auth-store';

export default function useSignUp(): UseMutationResult<
  RecruitApplicationResponse,
  Error,
  SignupRequest,
  unknown
> {
  const { login } = useAuthStore();

  const mutation = useMutation({
    mutationFn: authApi.SIGN_UP,
    onSuccess: async (data) => {
      localStorage.clear();

      // 유저 정보 패칭 후 authStore에 저장
      try {
        const getMeResponse = await authApi.GET_ME();
        login(getMeResponse);
      } catch (error) {
        console.error('유저 정보 패칭 실패:', error);
      }

      try {
        // 첫 번째 다이얼로그 (가입 완료)
        const showSecondDialog = (): void => {
          if (data.greetingDescription) {
            DialogUtil.showComponent(
              React.createElement(GreetingDialog, {
                title: '안내사항',
                message: data.greetingDescription || '학회 가입이 완료되었습니다.',
                onConfirm: () => (window.location.href = '/'),
                showBackground: false,
              })
            );
          } else {
            // greetingDescription이 없으면 바로 홈으로 이동
            window.location.href = '/';
          }
        };

        // 첫 번째 다이얼로그에서 확인 버튼을 누르면 두 번째 다이얼로그 표시
        DialogUtil.showComponent(
          React.createElement(GreetingDialog, {
            title: '학회 가입 완료 안내',
            message: data.description || '학회 가입이 완료되었습니다.',
            onConfirm: showSecondDialog,
            showBackground: false,
          })
        );
      } catch (error) {
        console.error('Failed to fetch recruit application:', error);
        // API 호출 실패 시 기본 메시지로 첫 번째 다이얼로그만 표시
        DialogUtil.showComponent(
          React.createElement(GreetingDialog, {
            title: '안내사항',
            message: '학회 가입이 완료되었습니다.',
            onConfirm: () => (window.location.href = '/'),
            showBackground: false,
          })
        );
      }
    },
  });

  return mutation;
}

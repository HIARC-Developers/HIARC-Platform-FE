import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { DialogUtil } from '@hiarc-platform/ui';
import { studyApi } from '../api/study';

export const useDownloadStudyMemberExcel = (): UseMutationResult<void, Error, number, unknown> =>
  useMutation({
    mutationFn: async (studyId: number) => {
      try {
        const response = await studyApi.DOWNLOAD_MEMBER_EXCEL(studyId) as {
          status: number;
          headers: { 'content-type'?: string };
          data: Blob;
        };

        console.log('[STUDY MEMBER EXCEL DOWNLOAD] 응답 받음:', {
          status: response.status,
          contentType: response.headers['content-type'],
          dataSize: response.data?.size,
          dataType: typeof response.data,
        });

        // 응답 데이터가 Blob인지 확인
        if (!(response.data instanceof Blob)) {
          throw new Error('응답 데이터가 Blob 형태가 아닙니다.');
        }

        // 서버에서 제공하는 Content-Type을 우선 사용하거나 기본값 사용
        const contentType = response.headers['content-type'] || 'text/csv';

        const blob = new Blob([response.data], { type: contentType });

        console.log('[STUDY MEMBER EXCEL DOWNLOAD] Blob 생성 완료:', {
          size: blob.size,
          type: blob.type,
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `스터디_명단_${studyId}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        console.log('[STUDY MEMBER EXCEL DOWNLOAD] 다운로드 트리거 완료');
      } catch (error) {
        console.error('[STUDY MEMBER EXCEL DOWNLOAD] 다운로드 실패:', error);
        throw error;
      }
    },
    onSuccess: () => {
      DialogUtil.showSuccess('스터디 명단 다운로드 요청이 완료되었습니다.');
    },
    onError: (error) => {
      DialogUtil.showServerError(error);
    },
  });

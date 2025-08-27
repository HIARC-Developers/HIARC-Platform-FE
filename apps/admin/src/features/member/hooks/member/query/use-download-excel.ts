import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { DialogUtil } from '@hiarc-platform/ui';
import { memberApi } from '../../../api/member';

export const useDownloadExcel = (): UseMutationResult<void, Error, number, unknown> =>
  useMutation({
    mutationFn: async (semesterId: number) => {
      try {
        const response = await memberApi.DOWNLOAD_EXCEL(semesterId);

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
        const contentType =
          response.headers['content-type'] ||
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

        const blob = new Blob([response.data], { type: contentType });

          size: blob.size,
          type: blob.type,
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `회원목록_${semesterId}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      DialogUtil.showSuccess('엑셀 다운로드 요청이 완료되었습니다.');
    },
    onError: (error) => {
      DialogUtil.showServerError(error);
    },
  });

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { announcementApi } from '../api/announcement';
import { ImageSource } from '@hiarc-platform/shared';

interface UploadImageParams {
  file: File;
}

export const useImageUpload: () => ReturnType<
  typeof useMutation<ImageSource, unknown, UploadImageParams>
> = () =>
  useMutation<ImageSource, unknown, UploadImageParams>({
    mutationFn: async ({ file }: UploadImageParams): Promise<ImageSource> => {
      // 1. presigned URL 가져오기 (파일의 MIME type 전달)
      const { resourceKey, url } = await announcementApi.GET_IMAGE_UPLOAD_URL(file.type);

      // 2. presigned URL로 이미지 업로드
      const formData = new FormData();
      formData.append('file', file);

      await axios.put(url ?? '', file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      // 3. 업로드된 이미지의 URL 반환 (presigned URL에서 query parameters 제거)
      const [uploadedUrl] = (url ?? '').split('?');

      return {
        resourceKey,
        url: uploadedUrl,
      };
    },
  });

'use client';

import { Button } from '@hiarc-platform/ui';
import { useParams, useRouter } from 'next/navigation';

export default function OAuthFailPage(): React.ReactElement {
  const params = useParams();
  const router = useRouter();
  const type = params.type as string;

  const handleGoBack = (): void => {
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-medium">
          {type === 'signup' ? '회원가입 필요' : '권한 없음'}
        </div>
        <p className="text-center text-gray-600">
          {type === 'signup'
            ? 'Intra 사이트에서 먼저 회원가입을 완료해주세요.'
            : '현재 계정으로는 접근 권한이 없습니다.'}
        </p>
        <Button onClick={handleGoBack}>로그인 페이지로 돌아가기</Button>
      </div>
    </div>
  );
}

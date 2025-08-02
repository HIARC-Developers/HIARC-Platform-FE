'use client';
import NoticeWrite from '@/features/components/notice-write-section';
import { Label } from '@hiarc-platform/ui';
import { Title } from '@hiarc-platform/ui';
export default function WriteNoticePage(): React.ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-6">
        <button
          className="flex cursor-pointer items-center self-start rounded-md p-2 transition-colors hover:bg-gray-50"
          onClick={() => window.history.back()}
        >
          <Label size="md" className="cursor-pointer text-gray-700">
            ← 뒤로가기
          </Label>
        </button>
        <div className="flex w-full items-center justify-between">
          <Title size="sm" weight="bold">
            공지사항 작성
          </Title>
        </div>
        <div className="h-px w-full bg-gray-700"></div>
      </div>
      <NoticeWrite />
    </main>
  );
}

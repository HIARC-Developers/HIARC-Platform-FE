'use client';
import { CreateStudyFrom } from '@/fetures/components/create-study-form-section';
import { Label } from '@hiarc-platform/ui';
import { Title } from '@hiarc-platform/ui';
export default function CreateStudyPage(): React.ReactElement {
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
            스터디 개설 정보
          </Title>
        </div>
        <div className="mt-6 h-px w-full bg-gray-700"></div>
      </div>
      <CreateStudyFrom />
    </main>
  );
}

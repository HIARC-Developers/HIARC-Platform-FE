'use client';

import { CreateStudyForm } from '../../components/create-study-form-section';
import { Label, Title } from '@hiarc-platform/ui';

export function StudyCreatePage(): React.ReactElement {
  const handleBackClick = (): void => {
    window.history.back();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-6">
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-4 md:gap-6">
        <button
          className="flex cursor-pointer items-center self-start rounded-md p-2 transition-colors hover:bg-gray-50"
          onClick={handleBackClick}
        >
          <Label size="sm" className="cursor-pointer text-gray-700 md:text-base">
            ← 뒤로가기
          </Label>
        </button>
        <div className="flex w-full items-center justify-between">
          <Title size="sm" weight="bold">
            스터디 개설 정보
          </Title>
        </div>
        <div className="h-px w-full bg-gray-700"></div>
      </div>
      <CreateStudyForm />
    </main>
  );
}
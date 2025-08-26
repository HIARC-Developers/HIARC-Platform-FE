'use client';

import { cn, StudyCard, Title } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';
import { useStudiesNow } from '../../hooks/use-studies-now';
import { formatDateWithDots } from '@hiarc-platform/util';

interface StudyListSectionProps {
  className?: string;
}

export function StudyListSection({ className }: StudyListSectionProps): React.ReactElement {
  const router = useRouter();
  const { data: studyList } = useStudiesNow();

  return (
    <div className={cn('flex w-full flex-col justify-center', className)}>
      <section className="">
        <div className="flex w-full justify-between">
          <Title size="sm" weight="bold" className="hidden md:block">
            스터디목록
          </Title>
          <Title size="xs" weight="bold" className="md:hidden">
            스터디목록
          </Title>
          {studyList && studyList.length > 0 && (
            <button
              onClick={() => {
                router.push('/study');
              }}
            >
              {'더보기 ->'}
            </button>
          )}
        </div>
        {studyList && studyList.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {studyList.map((study) => (
              <StudyCard
                key={study.studyId}
                studyId={study.studyId ?? 0}
                delivery={study.isOnline ? '비대면' : '대면'}
                studyTitle={study.studyName ?? ''}
                hostName={study.instructorName ?? ''}
                startDate={study.startDate ? formatDateWithDots(study.startDate) : ''}
                endDate={study.endDate ? formatDateWithDots(study.endDate) : ''}
                studyDescription={study.introduction ?? ''}
                state={study.activeStatus ?? 'CLOSED'}
                time={study.studyTime ?? ''}
                isEnrolled={study.isEnrolled ?? false}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 flex w-full items-center justify-center py-12">
            <Title size="xs" weight="medium" className="text-gray-500">
              스터디 준비중입니다!
            </Title>
          </div>
        )}
      </section>
    </div>
  );
}

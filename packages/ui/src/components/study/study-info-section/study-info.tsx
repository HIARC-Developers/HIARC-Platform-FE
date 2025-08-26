import { cn } from '@hiarc-platform/ui';
import { CategoryText } from './category-text';
import { Study } from '@hiarc-platform/shared';

export function StudyInfo({ studyData }: { studyData?: Study | null }): React.ReactElement {
  return (
    <div className={cn('grid grid-cols-1 grid-rows-6 gap-4', 'md:grid-cols-3 md:grid-rows-2')}>
      <CategoryText
        category={'진행 학기'}
        content={
          studyData
            ? `${studyData.semesterYear}년 ${studyData.semesterType === 'FIRST' ? '1' : '2'}학기`
            : '-'
        }
      />
      <CategoryText
        category={'진행 일시'}
        content={studyData ? `${studyData.scheduleText}` : '-'}
      />
      <CategoryText
        category={'참여 인원'}
        content={studyData ? `${studyData.currentParticipants ?? 0}명` : '-'}
      />
      <CategoryText category={'스터디장'} content={studyData?.instructorNameHandle || '-'} />
      <CategoryText
        category={'진행방식'}
        content={
          studyData?.isOnline === true
            ? '온라인'
            : studyData?.isOnline === false
              ? '오프라인'
              : '온라인'
        }
      />
      <CategoryText category={'언어'} content={studyData?.lang || '-'} />
    </div>
  );
}

'use client';

import { cn, Divider, SlideFade, Tabs } from '@hiarc-platform/ui';
import { useState } from 'react';
import { AnnouncementListItem } from './announcement-list-item';
import { useRouter } from 'next/navigation';
import { useUpcomingSchedule } from '../../hooks/use-upcoming-schedule';
import { useExternalSchedule } from '../../hooks/use-external-schedule';
import { Schedule } from '../../types/model/schedule';

interface AnnouncementListSectionProps {
  className?: string;
}

export function AnnouncementListSection({
  className,
}: AnnouncementListSectionProps): React.ReactElement {
  const tabItems = [
    { label: '다가오는 소식', value: 'announcement' },
    { label: '외부 소식', value: 'algorithm-news' },
  ];
  const [tab, setTab] = useState('announcement');
  const router = useRouter();
  const { data: upcomingSchedule } = useUpcomingSchedule();
  const { data: externalAnnouncements } = useExternalSchedule();

  const sortedUpcomingSchedules = upcomingSchedule?.schedules ? 
    [...upcomingSchedule.schedules].sort((a, b) => {
      if (a.announcementType === 'RATING' && b.announcementType !== 'RATING') return -1;
      if (a.announcementType !== 'RATING' && b.announcementType === 'RATING') return 1;
      return 0;
    }) : [];

  return (
    <div className={cn('w-full', className)}>
      <div className="flex w-full justify-between">
        <Tabs tabs={tabItems} activeTab={tab} onTabClick={setTab} />
        <button
          onClick={() => {
            router.push('/announcement');
          }}
        >
          {'더보기 ->'}
        </button>
      </div>

      <Divider variant="horizontal" size="full" className="mt-4" />
      <div className="h-[350px] overflow-y-auto">
        {tab === 'announcement' && (
          <SlideFade key="announcement">
            <div>
              {sortedUpcomingSchedules.map((announcement: Schedule, index: number) => (
                <AnnouncementListItem
                  key={announcement.announcementId || index}
                  announcementId={announcement.announcementId || 0}
                  title={announcement.scheduleTitle || '제목 없음'}
                  date={
                    announcement.announcementType === 'RATING' ? '' :
                    announcement.scheduledAt
                      ? new Date(announcement.scheduledAt).toLocaleDateString()
                      : new Date(announcement.createdAt ?? '').toLocaleDateString()
                  }
                  category={announcement.announcementType || 'GENERAL'}
                />
              ))}
            </div>
          </SlideFade>
        )}
        {tab === 'algorithm-news' && (
          <SlideFade key="algorithm-news">
            <div>
              {externalAnnouncements &&
                externalAnnouncements.map((announcement: Schedule, index: number) => (
                  <AnnouncementListItem
                    key={announcement.announcementId || index}
                    announcementId={announcement.announcementId || 0}
                    title={announcement.scheduleTitle || '제목 없음'}
                    date={
                      announcement.createdAt
                        ? new Date(announcement.createdAt).toLocaleDateString()
                        : ''
                    }
                    category={announcement.announcementType || 'GENERAL'}
                  />
                ))}
            </div>
          </SlideFade>
        )}
      </div>
    </div>
  );
}

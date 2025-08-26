'use client';
import { useState } from 'react';
import { cn, Tabs, SlideFade } from '@hiarc-platform/ui';
import { CurrentSemesterSection } from '../../components/manage-tab-section/current-semester-section';
import { RecruitManageSection } from '../../components/manage-tab-section/recruit-manage-section';

interface ManagePageProps {
  className?: string;
}

export function ManagePage({ className }: ManagePageProps): React.ReactElement {
  const [selectedTab, setSelectedTab] = useState('member_list_section');

  const tabs = [
    { label: '학회원 명단', value: 'member_list_section' },
    { label: '모집관리', value: 'recruit_manage_section' },
  ];

  return (
    <div className={cn('mt-4 flex w-full flex-col', className)}>
      <Tabs tabs={tabs} activeTab={selectedTab} onTabClick={setSelectedTab} />
      <div className={cn('min-h-[300px]', 'mt-6')}>
        {selectedTab === 'member_list_section' && (
          <SlideFade key="current_semester_list" className="w-full">
            <CurrentSemesterSection />
          </SlideFade>
        )}
        {selectedTab === 'recruit_manage_section' && (
          <SlideFade key="recruit_manage_section" className="w-full">
            <RecruitManageSection />
          </SlideFade>
        )}
      </div>
    </div>
  );
}

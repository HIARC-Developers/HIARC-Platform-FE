'use client';
import { cn, Tabs, SlideFade } from '@hiarc-platform/ui';
import { useState } from 'react';
import { CurrentSemesterSection } from './current-semester-section';
import { RecruitManageSection } from './recruit-manage-section';

interface TabSectionProps {
  isAdmin?: boolean;
  className?: string;
}

export function ManageTabSection({ className }: TabSectionProps): React.ReactElement {
  const tabs = [
    { label: '학회원 명단', value: 'member_list_section' },
    { label: '모집관리', value: 'recruit_manage_section' },
  ];

  const [selectedTab, setSelectedTab] = useState('member_list_section');

  return (
    <div className={cn('mt-4 flex w-full flex-col', className)}>
      <Tabs tabs={tabs} activeTab={selectedTab} onTabClick={setSelectedTab} />
      <div className="mt-6 min-h-[300px]">
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

import { Fragment, ReactElement } from 'react';
import { cn } from '../lib/utils';
import { Title } from './label/title';

interface TabItem {
  label: string;
  value: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabClick?(value: string): void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabClick, className = '' }: TabsProps): ReactElement {
  return (
    <div className={cn('flex items-center', className)}>
      {tabs.map((tab, idx) => (
        <Fragment key={tab.value}>
          <button
            className={cn(
              'transition-colors',
              activeTab === tab.value ? 'text-gray-900' : 'text-gray-300'
            )}
            onClick={() => onTabClick?.(tab.value)}
            type="button"
          >
            <Title size="sm" weight="bold" className="hidden cursor-pointer select-none md:block">
              {tab.label}
            </Title>
            <Title size="xs" weight="bold" className="cursor-pointer select-none md:hidden">
              {tab.label}
            </Title>
          </button>
          {idx < tabs.length - 1 && <div className="mx-4 h-[18px] w-px bg-gray-500" />}
        </Fragment>
      ))}
    </div>
  );
}

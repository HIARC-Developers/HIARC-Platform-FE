import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ContentSectionProps {
  children: ReactNode;
  className?: string;
}

export function ContentSection({ children, className }: ContentSectionProps): React.ReactElement {
  return (
    <div className={cn('flex w-full items-center justify-between', className)}>
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between">
        <div className="flex w-full flex-col items-center justify-between">{children}</div>
      </div>
    </div>
  );
}

interface TwoColumnLayoutProps {
  left: ReactNode;
  right: ReactNode;
  bottom?: ReactNode;
  className?: string;
}

export function TwoColumnLayout({
  left,
  right,
  bottom,
  className,
}: TwoColumnLayoutProps): React.ReactElement {
  return (
    <div className={cn('flex w-full flex-col items-center justify-between', className)}>
      <div className="flex w-full gap-4">
        <div className="w-1/2">{left}</div>
        <div className="w-1/2">{right}</div>
      </div>
      {bottom}
    </div>
  );
}

interface SingleColumnLayoutProps {
  children: ReactNode;
  className?: string;
}

export function SingleColumnLayout({
  children,
  className,
}: SingleColumnLayoutProps): React.ReactElement {
  return (
    <div className={cn('flex w-full flex-col items-center justify-between', className)}>
      {children}
    </div>
  );
}

import { cn } from '@hiarc-platform/ui';

export function SectionContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): React.ReactElement {
  return (
    <div className={cn('w-full rounded-md p-4', 'border border-gray-200', className)}>
      {children}
    </div>
  );
}

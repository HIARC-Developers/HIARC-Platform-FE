import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface PageLayoutProps {
  children?: ReactNode;
  mobileChildren?: ReactNode;
  desktopChildren?: ReactNode;
  stickyBottom?: ReactNode;
  className?: string;
  containerClassName?: string;
  stickyBottomClassName?: string;
}

export function PageLayout({
  children,
  mobileChildren,
  desktopChildren,
  stickyBottom,
  className,
  containerClassName,
  stickyBottomClassName,
}: PageLayoutProps): React.ReactElement {
  const hasMobile = Boolean(mobileChildren);
  const hasDesktop = Boolean(desktopChildren);

  return (
    <div className={cn('relative flex w-full flex-col items-center', className)}>
      <div
        className={cn(
          'mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 py-8',
          stickyBottom ? 'pb-36' : '',
          containerClassName
        )}
      >
        {hasMobile && hasDesktop ? (
          <>
            <div className="block w-full md:hidden">{mobileChildren}</div>
            <div className="hidden w-full md:block">{desktopChildren}</div>
          </>
        ) : hasMobile ? (
          // mobileChildren만 있는 경우: 모바일/데스크탑 모두 보임
          <div className="w-full">{mobileChildren}</div>
        ) : hasDesktop ? (
          // desktopChildren만 있는 경우: 모바일/데스크탑 모두 보임
          <div className="w-full">{desktopChildren}</div>
        ) : (
          // 아무것도 없으면 children
          <div className="w-full">{children}</div>
        )}
      </div>
      {stickyBottom && (
        <div
          className={cn(
            'pointer-events-auto sticky bottom-8 z-10',
            'mx-auto mb-4 flex w-full max-w-[1200px] justify-center px-5',
            stickyBottomClassName
          )}
        >
          {stickyBottom}
        </div>
      )}
    </div>
  );
}

import { cn, Divider, Label, Title } from '@hiarc-platform/ui';
import { SectionContainer } from '../section-container';
import { ContributionGrid } from './contribution-grid';

interface StreakSectionProps {
  totalDays?: number;
  currentSeasonDays?: number;
  className?: string;
}

export function StreakSection({
  totalDays,
  currentSeasonDays,
  className,
}: StreakSectionProps): React.ReactElement {
  return (
    <div className={cn('flex w-full min-w-0 flex-col gap-4', className)}>
      <Title size="sm" weight="bold" className="mb-4">
        스트릭
      </Title>

      <SectionContainer className="flex w-full flex-col gap-4">
        <div className="overflow-x-auto">
          <ContributionGrid data={[]} />
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex w-full flex-col gap-2 p-4">
            <div className="flex w-full items-center gap-2">
              <Label className="text-gray-700">누적</Label>
              <Label size="sm" className="text-primary-100">
                2025.01.21 시작
              </Label>
            </div>
            <div className="flex w-full items-center gap-2">
              <Title size="sm" weight="bold">
                {totalDays ?? 0}
              </Title>
              <Label size="lg">days</Label>
            </div>
          </div>
          <Divider variant="vertical" size="46.5px" />
          <div className="flex w-full flex-col gap-2 p-4">
            <Label className="text-gray-700">이번시즌</Label>
            <div className="flex w-full items-center gap-2">
              <Title size="sm" weight="bold">
                {currentSeasonDays ?? 0}
              </Title>
              <Label size="lg">days</Label>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}

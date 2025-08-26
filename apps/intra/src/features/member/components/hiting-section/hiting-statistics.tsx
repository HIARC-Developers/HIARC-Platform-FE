import { Label, Title } from '@hiarc-platform/ui';
import Image from 'next/image';
import { SectionContainer } from '../section-container';

interface HitingStatisticsProps {
  label: string;
  value: string | number;
  increased?: boolean;
}

export function HitingStatistics({
  label,
  value,
  increased,
}: HitingStatisticsProps): React.ReactElement {
  return (
    <SectionContainer>
      <div className="flex flex-col">
        <Label className="text-gray-700">{label}</Label>
        <div className="mt-2 flex items-center gap-1">
          <Title size="sm" weight="bold">
            {value}
          </Title>
          {increased && (
            <Image src="/shared-assets/ArrowUp.svg" alt="ArrowUp" width={16} height={16} />
          )}
        </div>
      </div>
    </SectionContainer>
  );
}

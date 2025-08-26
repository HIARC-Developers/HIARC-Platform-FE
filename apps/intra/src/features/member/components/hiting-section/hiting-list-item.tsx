import { CategoryChip, Label, RatingChip } from '@hiarc-platform/ui';
import Image from 'next/image';

interface HitingListItemProps {
  name: string;
  rank: number;
  div: 'DIV_1' | 'DIV_2' | 'DIV_3';
}

const medalSrcMap = {
  1: '/shared-assets/GoldMedal.svg',
  2: '/shared-assets/SilverMedal.svg',
  3: '/shared-assets/BronzeMedal.svg',
};

export function HitingListItem({ name, rank, div }: HitingListItemProps): React.ReactElement {
  return (
    <div className="flex w-full items-center">
      <RatingChip rating={div} />
      <Label size="lg" className="ml-4 flex-1">
        {name}
      </Label>
      {rank >= 1 && rank <= 3 && (
        <Image
          className="mr-1"
          src={medalSrcMap[rank as 1 | 2 | 3]}
          alt={`${rank}위 메달`}
          width={24}
          height={24}
        />
      )}
      <Label size="lg" weight="bold">
        {rank}위
      </Label>
    </div>
  );
}

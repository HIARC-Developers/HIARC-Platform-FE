import {
  AnnnouncementType,
  getAnnouncementTypeLabel,
  getAnnouncementTypeTextColor,
} from '@hiarc-platform/shared';
import { Divider } from '../../divider';
import { Label } from '../../label/label';
import { Title } from '../../label/title';
import { cn } from '@hiarc-platform/ui';
import { formatDateWithDots } from '@hiarc-platform/util';

interface HeaderSectionProps {
  announcementTitle: string;
  announcementCategory: 'RATING' | 'STUDY' | 'ETC' | 'GENERAL' | 'EXTERNAL';
  announcementDate: string;
}

export function HeaderSection({
  announcementTitle,
  announcementCategory,
  announcementDate,
}: HeaderSectionProps): React.ReactElement {
  return (
    <>
      <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between">
        <Title size="sm" weight="bold" disableAnimation>
          {announcementTitle}
        </Title>
        <div className="mt-2 flex items-center gap-3 md:mt-0">
          <Label
            size="md"
            className={cn(getAnnouncementTypeTextColor(AnnnouncementType[announcementCategory]))}
          >
            {getAnnouncementTypeLabel(AnnnouncementType[announcementCategory])}
          </Label>
          <Divider variant="vertical" size="10px" />
          <Label size="md" className="text-gray-700">
            {formatDateWithDots(announcementDate)}
          </Label>
        </div>
      </div>
      <Divider variant="horizontal" size="full" className="mt-6" />
    </>
  );
}

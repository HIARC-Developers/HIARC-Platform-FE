import { AnnouncementListSection } from '../../components/announcement-list-section';
import { StudyListSection } from '../../components/study-list-section';
import { ContentSection, SingleColumnLayout } from '@hiarc-platform/ui';
import { HiarcScheduleSection } from '../../components/hiarc-schedule-section';

export async function MobileHomePage(): Promise<React.ReactElement> {
  return (
    <ContentSection>
      <SingleColumnLayout>
        <HiarcScheduleSection daysToShow={3} />
        <AnnouncementListSection className="mt-10" />
        <StudyListSection className="mt-10" />
      </SingleColumnLayout>
    </ContentSection>
  );
}

import { AnnouncementListSection } from '../../components/announcement-list-section';
import { StudyListSection } from '../../components/study-list-section';
import { ContentSection, TwoColumnLayout } from '@hiarc-platform/ui';
import { HiarcScheduleSection } from '../../components/hiarc-schedule-section';

export async function DesktopHomePage(): Promise<React.ReactElement> {
  return (
    <ContentSection>
      <TwoColumnLayout
        left={<HiarcScheduleSection daysToShow={7} />}
        right={<AnnouncementListSection />}
        bottom={<StudyListSection className="mt-10" />}
      />
    </ContentSection>
  );
}

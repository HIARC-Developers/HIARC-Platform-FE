import { Title } from '@hiarc-platform/ui';
import StudyCard from '@/ui/studyCard/StudyCard';
import { Level } from 'constants/level';
export default function Home(): React.ReactElement {
  return (
    <main className="n mt-8 flex min-h-screen  w-full  flex-col  px-[360px]">
      {/*상단 임시로 높이 402px*/}
      <div className="flex h-[402px] gap-4">
        <section className="w-[50%]">
          <Title size="sm" weight="bold" className="mb-2">
            학회일정
          </Title>
        </section>
        <section className="w-[50%]">
          <Title size="sm" weight="bold" className="mb-2">
            공지사항/알고리즘소식
          </Title>
        </section>
      </div>

      {/* 하단 */}
      <div>
        <section className="">
          <Title size="sm" weight="bold" className="mb-2">
            스터디목록
          </Title>
          <div className="grid grid-cols-2 gap-4 ">
            <StudyCard
              time="화,금 (8시)"
              delivery="대면"
              studyLevel={Level.BASIC}
              studyTitle="초급스터디"
              hostName="이가은"
              startDate="2025.03.25"
              endDate="2025.06.20"
              studyDiscription="스터디 설명"
              state="participating"
            />
            <StudyCard
              time="화,금 (8시)"
              delivery="대면"
              studyLevel={Level.INTERMEDIATE}
              studyTitle="초급스터디"
              hostName="이태경"
              startDate="2025.03.25"
              endDate="2025.06.20"
              studyDiscription="스터디 설명"
              state="recruiting"
            />
            <StudyCard
              time="화,금 (8시)"
              delivery="비대면"
              studyLevel={Level.EXPERT}
              studyTitle="초급스터디"
              hostName="송한서"
              startDate="2025.03.25"
              endDate="2025.06.20"
              studyDiscription="스터디 설명"
              state="participating"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

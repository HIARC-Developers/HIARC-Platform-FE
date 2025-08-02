import BasicInformaionSection from './basic-information-section';
import DetailInformationSection from './detail-information-section';
export default function NoticeWrite(): React.ReactElement {
  return (
    <div className="mt-8 flex min-h-screen w-full max-w-[1200px] items-start gap-4">
      <DetailInformationSection />
      <div className=" w-[389px]">
        <BasicInformaionSection />
      </div>
    </div>
  );
}

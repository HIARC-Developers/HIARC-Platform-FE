import { Label, LabeledInput } from '@hiarc-platform/ui';

export function InformaionSection(): React.ReactElement {
  return (
    <div className="mt-2 flex  w-full max-w-[1200px] flex-col items-start gap-4">
      <Label size="lg" weight="bold">
        모집정보
      </Label>
      <div className="flex w-full  items-end gap-2">
        <LabeledInput label="모집 시작일" placeholder="일시를 선택해주세요" />
        <LabeledInput label="모집 종료일" placeholder="일시를 선택해주세요" />
      </div>
    </div>
  );
}

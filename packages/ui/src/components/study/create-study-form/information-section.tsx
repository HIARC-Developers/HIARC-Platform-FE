import { Label } from '../../label/label';
import { LabeledCalanderInput } from '../../input/labeled-calander-input';

export function InformaionSection({
  cruitPeriod,
  setCruitPeriod,
}: {
  cruitPeriod: [Date | null, Date | null];
  setCruitPeriod: React.Dispatch<React.SetStateAction<[Date | null, Date | null]>>;
}): React.ReactElement {
  return (
    <div className="mt-2 flex  w-full max-w-[1200px] flex-col items-start gap-4">
      <Label size="lg" weight="bold">
        모집정보
      </Label>
      <div className="flex w-full  items-end gap-2">
        <LabeledCalanderInput
          required
          label="모집기한"
          placeholder="일시를 선택해주세요"
          value={cruitPeriod}
          onChange={(value) => {
            if (Array.isArray(value)) {
              setCruitPeriod(value);
            }
          }}
          rangeMode={true}
        />
        <div className="w-full"></div>
      </div>
    </div>
  );
}

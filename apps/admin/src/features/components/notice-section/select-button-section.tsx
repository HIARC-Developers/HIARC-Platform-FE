import { Button, LabeledInput, LabeledSelectButton } from '@hiarc-platform/ui';
import { LabeledSelector } from '@hiarc-platform/ui';
import { selectOption } from 'constants/selectOption';
export default function SelectButtonSection(): React.ReactElement {
  return (
    <div className="flex w-full min-w-[1200px] items-end justify-center gap-4 rounded-lg border border-gray-200 p-6">
      <LabeledSelector
        label="카테고리"
        options={selectOption['카테고리']}
        placeholder="카테고리를 선택해주세요"
      />
      <LabeledSelector
        label="학기"
        options={selectOption['학기']}
        placeholder="카테고리를 선택해주세요"
      />
      <LabeledSelectButton label="공개여부" options={['전체', '공개', '비공개']} />
      <LabeledInput label="제목" placeholder="Placeholder" />
      <div className="flex gap-2">
        <Button size="md" className="w-[104px]" variant="line">
          초기화
        </Button>
        <Button size="md" className="w-[104px]">
          검색
        </Button>
      </div>
    </div>
  );
}

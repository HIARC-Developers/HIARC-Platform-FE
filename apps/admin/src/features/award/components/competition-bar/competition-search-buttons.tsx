import { Button, LabeledInput } from '@hiarc-platform/ui';

export function CompetitionSearchButtons(): React.ReactElement {
  return (
    <div className="flex w-full items-end gap-4 rounded-lg border border-gray-200 p-6 ">
      <LabeledInput label="주최(단체명)" placeholder="Placeholder" />
      <LabeledInput label="주최(단체명)" placeholder="Placeholder" />
      <LabeledInput label="주최(단체명)" placeholder="Placeholder" />
      <div className="flex gap-2">
        <Button size="md" variant="line_secondary" className="w-[134px]">
          초기화
        </Button>
        <Button size="md" className="w-[134px]">
          검색
        </Button>
      </div>
    </div>
  );
}

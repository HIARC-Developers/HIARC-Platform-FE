import { useState } from 'react';
import { Button, LabeledInput } from '@hiarc-platform/ui';

interface CompetitionSearchButtonsProps {
  onSearch?(params: { organization: string; awardName: string; memberName: string }): void;
  onReset?(): void;
}

export function CompetitionSearchButtons({
  onSearch,
  onReset,
}: CompetitionSearchButtonsProps): React.ReactElement {
  const [organization, setOrganization] = useState('');
  const [awardName, setAwardName] = useState('');
  const [memberName, setMemberName] = useState('');

  const handleSearch = (): void => {
    onSearch?.({
      organization: organization.trim(),
      awardName: awardName.trim(),
      memberName: memberName.trim(),
    });
  };

  const handleReset = (): void => {
    setOrganization('');
    setAwardName('');
    setMemberName('');
    onReset?.();
  };
  return (
    <div className="flex w-full items-end gap-4 rounded-lg border border-gray-200 p-6 ">
      <LabeledInput
        label="주최(단체명)"
        placeholder="주최 단체명을 입력하세요"
        value={organization}
        onChange={setOrganization}
      />
      <LabeledInput
        label="대회명"
        placeholder="대회명을 입력하세요"
        value={awardName}
        onChange={setAwardName}
      />
      <LabeledInput
        label="이름(핸들명)"
        placeholder="이름 또는 핸들명을 입력하세요"
        value={memberName}
        onChange={setMemberName}
      />
      <div className="flex gap-2">
        <Button size="md" variant="line_secondary" className="w-[134px]" onClick={handleReset}>
          초기화
        </Button>
        <Button size="md" className="w-[134px]" onClick={handleSearch}>
          검색
        </Button>
      </div>
    </div>
  );
}

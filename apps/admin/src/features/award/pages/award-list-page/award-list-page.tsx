'use client';

import { Title, Button, DialogUtil } from '@hiarc-platform/ui';
import { CompetitionTable } from '../../components/award-table';
import { CompetitionSearchButtons } from '../../components/competition-bar/competition-search-buttons';
import { useAwardList } from '../../hooks/use-award-list';
import { AddAwardDialog } from '../../components/add-award-modal';

export function AwardListPage(): React.ReactElement {
  const { data } = useAwardList();

  const handleAddAward = (): void => {
    DialogUtil.showComponent(<AddAwardDialog />);
  };

  return (
    <div className="flex w-full flex-col gap-6 py-4">
      <div className="flex justify-between">
        <Title size="sm" weight="bold">
          대회
        </Title>
        <Button size="md" onClick={handleAddAward}>
          추가하기
        </Button>
      </div>
      <CompetitionSearchButtons />
      <CompetitionTable className="mt-6" data={data} />
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Title, Button, DialogUtil } from '@hiarc-platform/ui';
import { CompetitionTable } from '../../components/award-table';
import { CompetitionSearchButtons } from '../../components/competition-bar/competition-search-buttons';
import { useAwardList } from '../../hooks/use-award-list';
import { AddAwardDialog } from '../../components/add-award-modal';
import { AwardQueryParams } from '../../types/request/award-query-params';

export function AwardListPage(): React.ReactElement {
  const [searchParams, setSearchParams] = useState<AwardQueryParams>({
    page: 0,
    size: 10,
  });
  const { data } = useAwardList(searchParams);

  const handleAddAward = (): void => {
    DialogUtil.showComponent(<AddAwardDialog />);
  };

  const handleSearch = (params: {
    organization: string;
    awardName: string;
    memberName: string;
  }): void => {
    setSearchParams({
      organization: params.organization || undefined,
      awardName: params.awardName || undefined,
      memberName: params.memberName || undefined,
      page: 0,
      size: 10,
    });
  };

  const handleReset = (): void => {
    setSearchParams({ page: 0, size: 10 });
  };

  const handlePageChange = (page: number): void => {
    setSearchParams(prev => ({
      ...prev,
      page,
    }));
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
      <CompetitionSearchButtons onSearch={handleSearch} onReset={handleReset} />
      <CompetitionTable className="mt-6" data={data} onPageChange={handlePageChange} />
    </div>
  );
}

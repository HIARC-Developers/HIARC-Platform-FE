import { Button, LabeledInput, LabeledSelectButton } from '@hiarc-platform/ui';
import { LabeledSelector } from '@hiarc-platform/ui';
import { selectOption } from 'constants/selectOption';
import { useState, useEffect } from 'react';
import { AnnouncementQueryParams } from '@/features/announcement/types/request/announcement-query-params';

interface AnnouncementFilterProps {
  onFilterChange?(filters: Partial<AnnouncementQueryParams>): void;
  filters?: Partial<AnnouncementQueryParams>;
}

export function AnnouncementFilter({
  onFilterChange,
  filters,
}: AnnouncementFilterProps): React.ReactElement {
  const [category, setCategory] = useState<string>('');
  const [isPublic, setIsPublic] = useState<string>('전체');
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (filters) {
      setCategory(filters.announcementType || '');
      setIsPublic(filters.isPublic === undefined ? '전체' : filters.isPublic ? 'true' : 'false');
      setTitle(filters.title || '');
    }
  }, [filters]);

  const handleSearch = (): void => {
    const filters: Partial<AnnouncementQueryParams> = {
      announcementType: category
        ? (category as AnnouncementQueryParams['announcementType'])
        : undefined,

      isPublic: isPublic === '' ? undefined : isPublic === 'true',
      title: title || undefined,
    };
    onFilterChange?.(filters);
  };

  const handleReset = (): void => {
    setCategory('');
    setIsPublic('전체');
    setTitle('');
    onFilterChange?.({});
  };

  return (
    <div className="flex w-full items-end  gap-4 rounded-lg border border-gray-200 p-6">
      <LabeledSelector
        label="카테고리"
        options={selectOption['카테고리']}
        placeholder="카테고리를 선택해주세요"
        value={category}
        onChange={setCategory}
      />
      <LabeledSelectButton
        label="공개여부"
        options={selectOption['공개여부']}
        value={isPublic}
        onChange={setIsPublic}
      />
      <LabeledInput
        label="제목"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(value) => setTitle(value)}
      />
      <div className="flex gap-2">
        <Button size="md" className="w-[134px]" variant="line_secondary" onClick={handleReset}>
          초기화
        </Button>
        <Button size="md" className="w-[134px]" onClick={handleSearch}>
          검색
        </Button>
      </div>
    </div>
  );
}

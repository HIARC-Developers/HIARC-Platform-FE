import { Button, LabeledInput } from '@hiarc-platform/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface MemberSearchFilterProps {
  onSearch(params: { name?: string; bojHandle?: string }): void;
}

export function MemberSearchFilter({ onSearch }: MemberSearchFilterProps): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 초기값 가져오기
  const [name, setName] = useState(searchParams.get('name') || '');
  const [bojHandle, setBojHandle] = useState(searchParams.get('bojHandle') || '');

  // URL 파라미터가 변경되면 상태 업데이트
  useEffect(() => {
    setName(searchParams.get('name') || '');
    setBojHandle(searchParams.get('bojHandle') || '');
  }, [searchParams]);

  // URL 업데이트 함수
  const updateURL = (params: { name?: string; bojHandle?: string; page?: number }): void => {
    const newSearchParams = new URLSearchParams(searchParams);

    // 검색 파라미터 설정
    if (params.name) {
      newSearchParams.set('name', params.name);
    } else {
      newSearchParams.delete('name');
    }

    if (params.bojHandle) {
      newSearchParams.set('bojHandle', params.bojHandle);
    } else {
      newSearchParams.delete('bojHandle');
    }

    // 검색할 때는 페이지를 0으로 리셋
    if (params.page !== undefined) {
      if (params.page === 0) {
        newSearchParams.delete('page');
      } else {
        newSearchParams.set('page', params.page.toString());
      }
    } else {
      newSearchParams.delete('page');
    }

    router.replace(`?${newSearchParams.toString()}`);
  };

  // 검색 핸들러
  const handleSearch = (): void => {
    const searchFilter = {
      name: name.trim() || undefined,
      bojHandle: bojHandle.trim() || undefined,
    };

    updateURL({ ...searchFilter, page: 0 });
    onSearch(searchFilter);
  };

  // 초기화 핸들러
  const handleReset = (): void => {
    setName('');
    setBojHandle('');
    updateURL({ name: undefined, bojHandle: undefined, page: 0 });
    onSearch({});
  };

  // 엔터 키 핸들러
  const handleKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex w-full items-end gap-4 rounded-lg border border-gray-200 p-6 ">
      <LabeledInput
        label="이름"
        placeholder="이름을 입력하세요"
        value={name}
        onChange={setName}
        onKeyPress={handleKeyPress}
      />
      <LabeledInput
        label="핸들명"
        placeholder="핸들명을 입력하세요"
        value={bojHandle}
        onChange={setBojHandle}
        onKeyPress={handleKeyPress}
      />
      <div className="flex gap-2">
        <Button
          size="md"
          className="w-[134px] text-md"
          variant="line_secondary"
          onClick={handleReset}
        >
          초기화
        </Button>
        <Button size="md" className="w-[134px] text-md" onClick={handleSearch}>
          검색
        </Button>
      </div>
    </div>
  );
}

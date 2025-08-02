'use client';

import { LabeledSelector, LabeledSelectButton } from '@hiarc-platform/ui';
import { selectOption } from 'constants/selectOption';
import { Button } from '@hiarc-platform/ui';
import { useState } from 'react';

export default function BasicInformaionSection(): React.ReactElement {
  const [category, setCategory] = useState<string>('');
  return (
    <div className="flex h-[689px] w-full flex-col justify-between rounded-lg border border-gray-200 p-4  ">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 ">
          <LabeledSelector
            placeholder="카테고리를 선택해주세요."
            options={selectOption['카테고리']}
            label="카테고리"
            onChange={(value: string) => setCategory(value)}
          />
          {category === '스터디' && (
            <LabeledSelector
              placeholder="스터디를 선택해주세요."
              options={selectOption['스터디']}
              label="스터디선택"
              showLabel={false}
            />
          )}
        </div>
        <LabeledSelectButton
          label="신청 유형"
          required={true}
          options={['신청 유형', '신청 없음']}
        />
        <LabeledSelectButton label="공개 여부" required={true} options={['공개', '비공개']} />
      </div>
      <Button className="w-full" size="lg">
        게시하기
      </Button>
    </div>
  );
}

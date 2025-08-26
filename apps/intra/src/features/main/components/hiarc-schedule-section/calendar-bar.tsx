'use client';

import { cn, IconButton, Label } from '@hiarc-platform/ui';
import { addDays, format, startOfWeek } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useMemo, useState } from 'react';

// 카테고리별 점 색상 정의 (원하는 대로 추가/수정)
const CATEGORY_COLORS: Record<string, string> = {
  rating: 'bg-category-rating',
  study: 'bg-category-study',
  general: 'bg-category-general',
  etc: 'bg-category-etc',
  external: 'bg-category-external',
};

interface DataItem {
  date: string;
  categories: string[];
}

interface Props {
  data: DataItem[];
  daysToShow: number; // 3 또는 7
  className?: string; // 추가: 클래스 이름을 받을 수 있도록
  onDateSelect?(date: string): void;
  selectedDate?: string;
  onWeekChange?(weekStart: Date): void;
  currentWeekStart?: Date;
}

function getDateRange(startDate: Date, days: number): Date[] {
  return Array.from({ length: days }, (_, i) => addDays(startDate, i));
}

function getStartOfWeekWithSunday(date: Date): Date {
  // 일요일 시작
  return startOfWeek(date, { weekStartsOn: 0 });
}

export default function CalendarBar({
  data,
  daysToShow,
  className,
  onDateSelect,
  selectedDate: externalSelectedDate,
  onWeekChange,
  currentWeekStart: externalCurrentWeekStart,
}: Props): React.ReactElement {
  const today = new Date();

  // 외부에서 전달된 currentWeekStart가 있으면 사용, 없으면 내부 state 사용
  const [internalCurrentStartDate, setInternalCurrentStartDate] = useState<Date>(
    daysToShow === 7 ? getStartOfWeekWithSunday(new Date()) : new Date()
  );
  const currentStartDate = externalCurrentWeekStart || internalCurrentStartDate;

  // 외부에서 전달된 selectedDate가 있으면 사용, 없으면 내부 state 사용
  const [internalSelectedDate, setInternalSelectedDate] = useState<string>(
    format(today, 'yyyy-MM-dd')
  );
  const selectedDate = externalSelectedDate || internalSelectedDate;

  const dates = getDateRange(currentStartDate, daysToShow);

  // 날짜별 데이터 맵핑
  const dataMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    data.forEach((item) => {
      map[item.date] = item.categories;
    });
    return map;
  }, [data]);

  // 날짜 선택 핸들러
  const handleDateSelect = (date: string): void => {
    if (onDateSelect) {
      onDateSelect(date);
    } else {
      setInternalSelectedDate(date);
    }
  };

  // 날짜 이동
  const move = (dir: 'prev' | 'next'): void => {
    const newWeekStart = addDays(currentStartDate, (dir === 'next' ? 1 : -1) * daysToShow);
    const newDates = getDateRange(newWeekStart, daysToShow);

    // 외부에서 주 변경 핸들러가 제공되면 사용
    if (onWeekChange) {
      onWeekChange(newWeekStart);
    } else {
      setInternalCurrentStartDate(newWeekStart);
    }

    // 새로운 주에서 선택된 날짜가 없으면 첫 번째 날짜 선택
    if (!newDates.some((day) => format(day, 'yyyy-MM-dd') === selectedDate)) {
      const newSelectedDate = format(newDates[0], 'yyyy-MM-dd');
      handleDateSelect(newSelectedDate);
    }
  };

  return (
    <div className={cn('flex w-full flex-col items-center gap-2', className)}>
      <div className="flex w-full items-center gap-2">
        <IconButton iconSrc="/shared-assets/Left.svg" onClick={() => move('prev')} />
        <div className="flex flex-1 overflow-hidden">
          {dates.map((date) => {
            const ymd = format(date, 'yyyy-MM-dd');
            const dayLabel = format(date, 'MM.dd(E)', { locale: ko });
            const cats = dataMap[ymd] || [];
            const isSelected = selectedDate === ymd;

            return (
              <div
                key={ymd}
                className={cn(
                  'flex min-w-0 flex-1 cursor-pointer flex-col items-center',
                  'justify-center px-1 py-1',
                  'transition-all hover:bg-gray-50',
                  'rounded-md border',
                  {
                    'border-primary-300 font-bold text-blue-900': isSelected,
                    'border-transparent': !isSelected,
                  }
                )}
                onClick={() => handleDateSelect(ymd)}
              >
                <Label className="max-w-full truncate text-xs text-gray-700">{dayLabel}</Label>
                <div className="mt-1 flex h-7 items-center justify-center gap-0.5">
                  {cats.map((cat, idx) => (
                    <span
                      key={cat + idx}
                      className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        CATEGORY_COLORS[cat] || 'bg-gray-300'
                      )}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <IconButton iconSrc="/shared-assets/Right.svg" onClick={() => move('next')} />
      </div>
    </div>
  );
}

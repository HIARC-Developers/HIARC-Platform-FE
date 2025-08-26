'use client';

import { cn } from '@hiarc-platform/ui';
import { addDays, differenceInDays, endOfYear, format, getDay, startOfYear } from 'date-fns';

const daysInWeek = 7;
const boxSize = 8;
const boxGap = 2.5;
const monthLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

interface ContributionData {
  date: string;
  count: number;
}

interface Props {
  data: ContributionData[];
}

const getColor = (count: number): string => {
  if (count === 0) {
    return 'bg-gray-100';
  }
  if (count < 3) {
    return 'bg-green-200';
  }
  if (count < 5) {
    return 'bg-green-300';
  }
  if (count < 10) {
    return 'bg-green-400';
  }
  return 'bg-green-500';
};

export function ContributionGrid({ data }: Props): React.ReactElement {
  const currentYear = new Date().getFullYear();
  const yearStart = startOfYear(new Date(currentYear, 0, 1));
  const yearEnd = endOfYear(new Date(currentYear, 11, 31));

  const totalDaysInYear = differenceInDays(yearEnd, yearStart) + 1;
  const startDayOfWeek = getDay(yearStart);
  const totalWeeks = Math.ceil((totalDaysInYear + startDayOfWeek) / 7);

  const dateMap = new Map<string, number>();
  data.forEach(({ date, count }) => {
    dateMap.set(date, count);
  });

  const gridWidth = totalWeeks * boxSize + (totalWeeks - 1) * boxGap;

  const getMonthPositions = (): Array<{ month: string; left: number }> => {
    const positions: Array<{ month: string; left: number }> = [];
    const monthStarts: number[] = [];

    for (let month = 0; month < 12; month++) {
      const monthStart = new Date(currentYear, month, 1);
      const daysSinceYearStart = differenceInDays(monthStart, yearStart);
      const weekPosition = Math.floor((daysSinceYearStart + startDayOfWeek) / 7);
      const left = weekPosition * (boxSize + boxGap);

      if (monthStarts.length === 0 || weekPosition > monthStarts[monthStarts.length - 1]) {
        positions.push({ month: monthLabels[month], left });
        monthStarts.push(weekPosition);
      }
    }

    return positions;
  };

  const monthPositions = getMonthPositions();

  return (
    <div className="relative">
      <div className="relative mb-2 h-4" style={{ width: `${gridWidth}px` }}>
        {monthPositions.map(({ month, left }) => (
          <span
            key={month}
            className="absolute text-xs text-gray-600"
            style={{ left: `${left}px` }}
          >
            {month}
          </span>
        ))}
      </div>

      <div
        className="inline-flex"
        style={{
          width: `${gridWidth}px`,
          gap: `${boxGap}px`,
          minWidth: `${gridWidth}px`,
        }}
      >
        {Array.from({ length: totalWeeks }).map((_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col" style={{ gap: `${boxGap}px` }}>
            {Array.from({ length: daysInWeek }).map((_, dayIndex) => {
              const dayOffset = weekIndex * daysInWeek + dayIndex - startDayOfWeek;

              if (dayOffset < 0 || dayOffset >= totalDaysInYear) {
                return <div key={`empty-${weekIndex}-${dayIndex}`} className="h-2 w-2" />;
              }

              const currentDate = addDays(yearStart, dayOffset);
              const dateString = format(currentDate, 'yyyy-MM-dd');
              const count = dateMap.get(dateString) || 0;

              return (
                <div
                  key={dateString}
                  title={`${dateString}: ${count} contributions`}
                  className={cn('h-2 w-2', getColor(count))}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

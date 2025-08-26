import styled from 'styled-components';
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
  if (count === 0) return '#f3f4f6'; // gray-100
  if (count < 3) return '#bbf7d0'; // green-200
  if (count < 5) return '#86efac'; // green-300
  if (count < 10) return '#4ade80'; // green-400
  return '#22c55e'; // green-500
};

const GridWrapper = styled.div`
  position: relative;
`;

const MonthLabelContainer = styled.div<{ width: number }>`
  position: relative;
  height: 1rem;
  margin-bottom: 0.5rem;
  width: ${({ width }) => `${width}px`};
`;

const MonthLabel = styled.span<{ left: number }>`
  position: absolute;
  font-size: 0.75rem;
  color: #4b5563; /* text-gray-600 */
  left: ${({ left }) => `${left}px`};
`;

const GridContent = styled.div<{ width: number }>`
  display: inline-flex;
  width: ${({ width }) => `${width}px`};
  min-width: ${({ width }) => `${width}px`};
  gap: ${boxGap}px;
`;

const WeekColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${boxGap}px;
`;

const DayBox = styled.div<{ bg: string }>`
  width: ${boxSize}px;
  height: ${boxSize}px;
  background-color: ${({ bg }) => bg};
`;

export function DinamicStreakBox({ data }: Props): React.ReactElement {
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
    <GridWrapper>
      <MonthLabelContainer width={gridWidth}>
        {monthPositions.map(({ month, left }) => (
          <MonthLabel key={month} left={left}>
            {month}
          </MonthLabel>
        ))}
      </MonthLabelContainer>

      <GridContent width={gridWidth}>
        {Array.from({ length: totalWeeks }).map((_, weekIndex) => (
          <WeekColumn key={weekIndex}>
            {Array.from({ length: daysInWeek }).map((_, dayIndex) => {
              const dayOffset = weekIndex * daysInWeek + dayIndex - startDayOfWeek;

              if (dayOffset < 0 || dayOffset >= totalDaysInYear) {
                return <DayBox key={`empty-${weekIndex}-${dayIndex}`} bg="transparent" />;
              }

              const currentDate = addDays(yearStart, dayOffset);
              const dateString = format(currentDate, 'yyyy-MM-dd');
              const count = dateMap.get(dateString) || 0;

              return (
                <DayBox
                  key={dateString}
                  title={`${dateString}: ${count} contributions`}
                  bg={getColor(count)}
                />
              );
            })}
          </WeekColumn>
        ))}
      </GridContent>
    </GridWrapper>
  );
}

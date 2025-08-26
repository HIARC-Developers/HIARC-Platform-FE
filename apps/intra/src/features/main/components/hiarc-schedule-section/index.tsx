'use client';

import { cn, Divider, FadeIn, Label, SlideFade, Title } from '@hiarc-platform/ui';
import { useMemo, useState, useCallback } from 'react';
import { addDays, startOfWeek, format } from 'date-fns';
import CalendarBar from './calendar-bar';
import { ScheduleListItem } from './schedule-list-item';
import { useCalendarSchedule } from '../../hooks/use-calendar-schedule';

interface HiarcScheduleSectionProps {
  daysToShow?: number;
  className?: string;
}

export function HiarcScheduleSection({
  daysToShow = 7,
  className,
}: HiarcScheduleSectionProps): React.ReactElement {
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    () => startOfWeek(new Date(), { weekStartsOn: 0 }) // 일요일 시작
  );

  // 현재 표시되는 날짜들의 중앙값 계산 (median으로 사용)
  const medianDate = useMemo(() => {
    const medianIndex = Math.floor(daysToShow / 2); // 중앙 인덱스 계산
    const medianDay = addDays(currentWeekStart, medianIndex);
    return format(medianDay, 'yyyy-MM-dd');
  }, [currentWeekStart, daysToShow]);

  const { data: calendarSchedules, isLoading } = useCalendarSchedule({
    median: medianDate,
    range: daysToShow,
  });

  // 캘린더 데이터 변환 (API 데이터 -> CalendarBar 형식)
  const calendarData = useMemo(() => {
    if (!calendarSchedules) {
      return [];
    }

    return calendarSchedules.map((schedule) => {
      const date = schedule.date ? format(schedule.date, 'yyyy-MM-dd') : '';
      const categories = schedule.schedules
        ? Array.from(
            new Set(
              schedule.schedules
                .map((schedule) => schedule.announcementType?.toLowerCase())
                .filter((type): type is string => Boolean(type))
            )
          )
        : [];

      return { date, categories };
    });
  }, [calendarSchedules]);

  // 선택된 날짜의 일정들
  const selectedSchedules = useMemo(() => {
    if (!calendarSchedules) {
      return [];
    }

    const selectedScheduleData = calendarSchedules.find(
      (schedule) => schedule.date && format(schedule.date, 'yyyy-MM-dd') === selectedDate
    );

    return selectedScheduleData?.schedules || [];
  }, [calendarSchedules, selectedDate]);

  // 날짜 선택 핸들러
  const handleDateSelect = useCallback((date: string) => {
    setSelectedDate(date);
  }, []);

  // 주 변경 핸들러
  const handleWeekChange = useCallback((newWeekStart: Date) => {
    setCurrentWeekStart(newWeekStart);
    // 새로운 주로 변경될 때 첫 번째 날짜를 선택
    setSelectedDate(format(newWeekStart, 'yyyy-MM-dd'));
  }, []);

  return (
    <section className={cn('w-full', className)}>
      <div className="flex w-full items-center">
        <Title size="sm" weight="bold" className="hidden whitespace-nowrap md:block">
          학회일정
        </Title>
        <Title size="xs" weight="bold" className="whitespace-nowrap md:hidden">
          학회일정
        </Title>
        <div className="ml-[14px] flex w-full items-center gap-2">
          <div className="h-2 w-2 rounded-sm bg-category-rating" />
          <Label size="sm" weight="regular">
            하이팅
          </Label>
          <div className="h-2 w-2 rounded-sm bg-category-study" />
          <Label size="sm" weight="regular">
            스터디
          </Label>
          <div className="h-2 w-2 rounded-sm bg-category-general" />
          <Label size="sm" weight="regular">
            학회 행사
          </Label>
          <div className="h-2 w-2 rounded-sm bg-category-external" />
          <Label size="sm" weight="regular">
            외부
          </Label>
          <div className="h-2 w-2 rounded-sm bg-category-etc" />
          <Label size="sm" weight="regular">
            기타
          </Label>
        </div>
      </div>
      <Divider variant="horizontal" size="full" className="mt-4" />

      <CalendarBar
        data={calendarData}
        daysToShow={daysToShow}
        className="mb-7 mt-4"
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
        onWeekChange={handleWeekChange}
        currentWeekStart={currentWeekStart}
      />

      <SlideFade key={selectedDate}>
        <div className="flex h-[242px] flex-col gap-2 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">로딩중...</div>
          ) : selectedSchedules.length > 0 ? (
            selectedSchedules.map((schedule, index) => (
              <ScheduleListItem
                key={index}
                schedule={schedule}
                title={schedule.scheduleTitle || '제목 없음'}
                category={schedule.announcementType || 'GENERAL'}
              />
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">선택한 날짜에 일정이 없습니다.</div>
          )}
        </div>
      </SlideFade>
    </section>
  );
}

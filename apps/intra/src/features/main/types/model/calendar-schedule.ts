import { Schedule } from './schedule';

export interface CalendarSchedule {
  date?: Date | null;
  schedules?: Schedule[];
}

export const CalendarSchedule = {
  fromJson(json: unknown): CalendarSchedule {
    const data = (json || {}) as Record<string, unknown>;
    return {
      date: data.date ? new Date(data.date as string) : null,
      schedules: Array.isArray(data.schedules)
        ? data.schedules.map((item) => Schedule.fromJson(item))
        : [],
    };
  },
};

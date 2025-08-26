import { Schedule } from './schedule';

interface Rating {
  season: {
    title: string;
    startDateTime: Date;
    endDateTime: Date;
  };
  event: {
    title: string;
    startDateTime: Date;
    endDateTime: Date;
  };
}

export interface UpcomingSchedule {
  rating: Rating;
  schedules: Schedule[];
}

export const UpcomingSchedule = {
  fromJson(json: unknown): UpcomingSchedule {
    const data = (json || {}) as Record<string, unknown>;
    const ratingData = (data.rating || {}) as Record<string, unknown>;
    const seasonData = (ratingData.season || {}) as Record<string, unknown>;
    const eventData = (ratingData.event || {}) as Record<string, unknown>;
    const schedulesData = (data.schedules || []) as unknown[];

    return {
      rating: {
        season: {
          title: (seasonData.title as string) || '',
          startDateTime: seasonData.startDateTime
            ? new Date(seasonData.startDateTime as string)
            : new Date(),
          endDateTime: seasonData.endDateTime
            ? new Date(seasonData.endDateTime as string)
            : new Date(),
        },
        event: {
          title: (eventData.title as string) || '',
          startDateTime: eventData.startDateTime
            ? new Date(eventData.startDateTime as string)
            : new Date(),
          endDateTime: eventData.endDateTime
            ? new Date(eventData.endDateTime as string)
            : new Date(),
        },
      },
      schedules: schedulesData.map((schedule) => Schedule.fromJson(schedule)),
    };
  },
};

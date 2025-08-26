export interface StudyNow {
  studyId?: number | null;
  studyName?: string | null;
  instructorId?: number | null;
  instructorName?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  introduction?: string | null;
  scheduledDays?: Array<'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY'> | null;
  startTime?: string | null;
  isOnline?: boolean | null;
  activeStatus?: 'PREPARING' | 'PRE_OPEN' | 'RECRUITING' | 'IN_PROGRESS' | 'CLOSED' | null;
  isEnrolled?: boolean | null;
  get studyTime(): string;
}

export const StudyNow = {
  fromJson(json: unknown): StudyNow {
    const data = (json || {}) as Record<string, unknown>;
    const studyData = {
      studyId: (data.studyId as number) || null,
      studyName: (data.studyName as string) || null,
      instructorId: (data.instructorId as number) || null,
      instructorName: (data.instructorName as string) || null,
      startDate: data.startDate ? new Date(data.startDate as string) : null,
      endDate: data.endDate ? new Date(data.endDate as string) : null,
      introduction: (data.introduction as string) || null,
      scheduledDays:
        (data.scheduledDays as Array<'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY'>) ||
        null,
      startTime: (data.startTime as string) || null,
      isOnline: (data.isOnline as boolean) || null,
      activeStatus:
        (data.activeStatus as 'PREPARING' | 'PRE_OPEN' | 'RECRUITING' | 'IN_PROGRESS' | 'CLOSED') ||
        null,
      isEnrolled: (data.isEnrolled as boolean) || null,
    };

    return {
      ...studyData,
      get studyTime(): string {
        const dayMap = {
          MONDAY: '월',
          TUESDAY: '화',
          WEDNESDAY: '수',
          THURSDAY: '목',
          FRIDAY: '금',
          SATURDAY: '토',
          SUNDAY: '일',
        };

        if (!this.scheduledDays || this.scheduledDays.length === 0) {
          return '미정';
        }

        const days = this.scheduledDays.map((day) => dayMap[day]).join(',');

        if (!this.startTime) {
          return days;
        }

        // 시간 포맷팅 (HH:mm:ss -> H시 M분)
        const [hours, minutes] = this.startTime.split(':');
        const hour = Number(hours);
        const minute = Number(minutes);

        let timeStr = `${hour}시`;
        if (minute > 0) {
          timeStr += ` ${minute}분`;
        }

        return `${days} (${timeStr})`;
      },
    };
  },
};

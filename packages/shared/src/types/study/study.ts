import { DateUtil } from '../../util/date-util';

export interface Study {
  studyId?: number | null;
  name?: string | null;
  isGroupStudy?: boolean | null;
  studyStatus?: 'PREPARING' | 'PRE_OPEN' | 'RECRUITING' | 'IN_PROGRESS' | 'CLOSED' | null;
  introduction?: string | null;
  lang?: string | null;
  currentParticipants?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  recruitmentStartDate?: string | null;
  recruitmentEndDate?: string | null;
  semesterId?: number | null;
  semesterYear?: number | null;
  semesterType?: 'FIRST' | 'SECOND' | null;
  scheduledDays?: string[] | null;
  startTime?: string | null;
  isOnline?: boolean | null;
  studyType?: string | null;
  instructorId?: number | null;
  instructorName?: string | null;
  instructorBojHandle?: string | null;
  isInstructor?: boolean | null;
  isStudent?: boolean | null;
  precaution?: string | null;

  // Computed properties
  readonly scheduleText?: string;
  readonly instructorNameHandle?: string;
  readonly recruitingDates?: string;
}

export const Study = {
  fromJson(json: unknown): Study {
    const data = (json || {}) as Record<string, unknown>;
    const study = {
      studyId: (data.studyId as number) || null,
      name: (data.name as string) || null,
      isGroupStudy: (data.isGroupStudy as boolean) || null,
      studyStatus:
        (data.studyStatus as 'PREPARING' | 'PRE_OPEN' | 'RECRUITING' | 'IN_PROGRESS' | 'CLOSED') ||
        null,
      introduction: (data.introduction as string) || null,
      lang: (data.lang as string) || null,
      currentParticipants: (data.currentParticipants as number) || null,
      startDate: (data.startDate as string) || null,
      endDate: (data.endDate as string) || null,
      recruitmentStartDate: (data.recruitmentStartDate as string) || null,
      recruitmentEndDate: (data.recruitmentEndDate as string) || null,
      semesterId: (data.semesterId as number) || null,
      semesterYear: (data.semesterYear as number) || null,
      semesterType: (data.semesterType as 'FIRST' | 'SECOND') || null,
      scheduledDays: (data.scheduledDays as string[]) || null,
      startTime: (data.startTime as string) || null,
      isOnline: (data.isOnline as boolean) || null,
      studyType: (data.studyType as string) || null,
      instructorId: (data.instructorId as number) || null,
      instructorName: (data.instructorName as string) || null,
      instructorBojHandle: (data.instructorBojHandle as string) || null,
      isInstructor: (data.isInstructor as boolean) || null,
      isStudent: (data.isStudent as boolean) || null,
    };

    // Add computed properties
    return {
      ...study,
      scheduleText: this.getScheduleText(study),
      instructorNameHandle: this.getInstructorNameHandle(study),
      recruitingDates: this.getRecruitingDates(study),
    };
  },

  getScheduleText(study: Study): string {
    if (!study.scheduledDays || study.scheduledDays.length === 0 || !study.startTime) {
      return '-';
    }

    // Day mapping
    const dayMap: Record<string, string> = {
      MONDAY: '월',
      TUESDAY: '화',
      WEDNESDAY: '수',
      THURSDAY: '목',
      FRIDAY: '금',
      SATURDAY: '토',
      SUNDAY: '일',
    };

    // Convert days to Korean
    const koreanDays = study.scheduledDays.map((day) => dayMap[day] || day).join(',');

    // Parse time (HH:MM:SS format)
    const timeParts = study.startTime.split(':');
    const hour = Number(timeParts[0]);

    // Convert to 12-hour format
    const period = hour < 12 ? '오전' : '오후';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

    return `매주 ${koreanDays} ${period} ${displayHour}시`;
  },

  getInstructorNameHandle(study: Study): string {
    if (!study.instructorName) {
      return '-';
    }

    if (!study.instructorBojHandle) {
      return study.instructorName;
    }

    return `${study.instructorName}(${study.instructorBojHandle})`;
  },

  getRecruitingDates(study: Study): string {
    if (!study.recruitmentStartDate || !study.recruitmentEndDate) {
      return '-';
    }

    return `${DateUtil.formatDateWithDots(study.recruitmentStartDate)} - ${DateUtil.formatDateWithDots(study.recruitmentEndDate)}`;
  },
};

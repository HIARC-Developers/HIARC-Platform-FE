export interface StudyInitialForm {
  name?: string;
  bojHandle?: string;
  isGroupStudy?: boolean;
  semesterId?: number;
  startDate?: string | null;
  endDate?: string | null;
  scheduledDays?: string[];
  startTime?: string | null;
  isOnline?: boolean | null;
  lang?: string | null;
  introduction?: string | null;
  recruitmentStartAt?: string | null;
  recruitmentEndAt?: string | null;
  precaution?: string | null;
  isPublic?: boolean | null;
}

export const StudyInitialForm = {
  fromJson(json: unknown): StudyInitialForm {
    const data = (json || {}) as Record<string, unknown>;
    return {
      name: (data.name as string) || '',
      bojHandle: (data.bojHandle as string) || '',
      isGroupStudy: (data.isGroupStudy as boolean) || false,
      semesterId: data.semesterId as number,
      startDate: (data.startDate as string) || null,
      endDate: (data.endDate as string) || null,
      scheduledDays: (data.scheduledDays as string[]) || [],
      startTime: (data.startTime as string | null) || null,
      isOnline: (data.isOnline as boolean) || null,
      lang: (data.lang as string) || null,
      introduction: (data.introduction as string) || null,
      recruitmentStartAt: (data.recruitmentStartAt as string) || null,
      recruitmentEndAt: (data.recruitmentEndAt as string) || null,
      precaution: (data.precaution as string) || null,
      isPublic: data.isPublic === true || data.isPublic === false ? data.isPublic : null,
    };
  },
};

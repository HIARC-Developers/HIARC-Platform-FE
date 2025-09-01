import { Semester } from './semester';

export interface CurrentSemester {
  currentSemester: Semester;
  recruitingSemester?: Semester;
}

export const CurrentSemester = {
  fromJson(json: unknown): CurrentSemester {
    const data = (json || {}) as Record<string, unknown>;
    return {
      currentSemester: Semester.fromJson(data.currentSemester),
      recruitingSemester: data.recruitingSemester
        ? Semester.fromJson(data.recruitingSemester)
        : undefined,
    };
  },
};

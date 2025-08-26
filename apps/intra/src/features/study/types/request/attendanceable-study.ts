export interface AttendanceableStudy {
  studyId?: number | null;
  studyName?: string | null;
  currentRound?: number | null;
  lectureTitle?: string | null;
}

export const AttendanceableStudy = {
  fromJson(json: unknown): AttendanceableStudy {
    const data = (json || {}) as Record<string, unknown>;
    const attendanceableStudy = {
      studyId: (data.studyId as number) || null,
      studyName: (data.studyName as string) || null,
      currentRound: (data.currentRound as number) || null,
      lectureTitle: (data.lectureTitle as string) || null,
    };

    return attendanceableStudy;
  },
};

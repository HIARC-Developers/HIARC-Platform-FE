import { StudyMember } from './study-member';

export interface StudyGroup {
  groupId?: number | null;
  groupName?: string | null;
  students?: StudyMember[] | null;
}

export const StudyGroup = {
  fromJson(json: unknown): StudyGroup {
    const data = (json || {}) as Record<string, unknown>;
    return {
      groupId: typeof data.groupId === 'number' ? data.groupId : null,
      groupName: (data.groupName as string) || null,
      students: data.students
        ? (data.students as unknown[]).map((student: unknown) => StudyMember.fromJson(student))
        : null,
    };
  },
};

import { StudyGroup } from './study-group';
import { StudyMember } from './study-member';

export interface StudyGroupList {
  studyGroups?: StudyGroup[] | null;
  aloneStudents?: StudyMember[] | null;
}

export const StudyGroupList = {
  fromJson(json: unknown): StudyGroupList {
    const data = (json || {}) as Record<string, unknown>;
    return {
      studyGroups: data.studyGroups
        ? (data.studyGroups as unknown[]).map((group: unknown) => StudyGroup.fromJson(group))
        : null,
      aloneStudents: data.aloneStudents
        ? (data.aloneStudents as unknown[]).map((student: unknown) => StudyMember.fromJson(student))
        : null,
    };
  },
};

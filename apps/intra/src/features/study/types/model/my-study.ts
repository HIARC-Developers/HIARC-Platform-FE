export interface MyStudy {
  studyId?: number | null;
  name?: string | null;
  role?: 'INSTRUCTOR' | 'MEMBER' | null;
}

export const MyStudy = {
  fromJson(json: unknown): MyStudy {
    const data = (json || {}) as Record<string, unknown>;
    return {
      studyId: typeof data.studyId === 'number' ? data.studyId : null,
      name: (data.name as string) || null,
      role: (data.role as 'INSTRUCTOR' | 'MEMBER') || null,
    };
  },
};

/**
 * Query Keys Factory for Admin App
 * Based on TkDodo's recommendations for React Query key management
 */

export const queryKeys = {
  // Study related queries  
  studies: {
    all: ['studies'] as const,
    lists: () => [...queryKeys.studies.all, 'list'] as const,
    list: (params: any) => [...queryKeys.studies.lists(), params] as const,
    details: () => [...queryKeys.studies.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.studies.details(), id] as const,
    lectures: (studyId: number) => [...queryKeys.studies.detail(studyId), 'lectures'] as const,
    assignments: (studyId: number) => [...queryKeys.studies.detail(studyId), 'assignments'] as const,
    attendanceCodes: (studyId: number) => [...queryKeys.studies.detail(studyId), 'attendance-codes'] as const,
  },

  // Announcement related queries
  announcements: {
    all: ['announcements'] as const,
    admin: {
      all: ['admin-announcements'] as const,
      lists: () => [...queryKeys.announcements.admin.all, 'list'] as const,
      list: (params: any) => [...queryKeys.announcements.admin.lists(), params] as const,
      details: () => [...queryKeys.announcements.admin.all, 'detail'] as const,
      detail: (id: number) => [...queryKeys.announcements.admin.details(), id] as const,
    },
  },

  // Member/Student related queries
  members: {
    all: ['members'] as const,
    students: {
      all: ['student-list'] as const,
      lists: () => [...queryKeys.members.students.all, 'list'] as const,
      list: (params: any) => [...queryKeys.members.students.lists(), params] as const,
    },
    admins: {
      all: ['admin-list'] as const,
      lists: () => [...queryKeys.members.admins.all, 'list'] as const,
      list: (semesterId: number) => [...queryKeys.members.admins.lists(), semesterId] as const,
    },
    instructors: {
      all: ['instructor-list'] as const,
      lists: () => [...queryKeys.members.instructors.all, 'list'] as const,
      list: (semesterId: number) => [...queryKeys.members.instructors.lists(), semesterId] as const,
    },
  },

  // Award related queries
  awards: {
    all: ['awards'] as const,
    lists: () => [...queryKeys.awards.all, 'list'] as const,
    list: (params: any) => [...queryKeys.awards.lists(), params] as const,
    details: () => [...queryKeys.awards.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.awards.details(), id] as const,
  },

  // Recruitment related queries
  recruitment: {
    all: ['recruitment-list'] as const,
    lists: () => [...queryKeys.recruitment.all, 'list'] as const,
    list: (params: any) => [...queryKeys.recruitment.lists(), params] as const,
  },

  // Semester related queries
  semesters: {
    all: ['semesters'] as const,
    current: () => [...queryKeys.semesters.all, 'current'] as const,
  },

  // Lectures (general)
  lectures: {
    all: ['lectures'] as const,
    lists: () => [...queryKeys.lectures.all, 'list'] as const,
    list: (params: any) => [...queryKeys.lectures.lists(), params] as const,
  },
} as const;

// Mutation keys for better organization
export const mutationKeys = {
  studies: {
    create: ['studies', 'create'] as const,
    update: ['studies', 'update'] as const,
    delete: ['studies', 'delete'] as const,
    lectures: {
      create: ['studies', 'lectures', 'create'] as const,
      update: ['studies', 'lectures', 'update'] as const,
      delete: ['studies', 'lectures', 'delete'] as const,
    },
    assignments: {
      create: ['studies', 'assignments', 'create'] as const,
    },
    attendanceCodes: {
      create: ['studies', 'attendance-codes', 'create'] as const,
    },
  },
  announcements: {
    admin: {
      create: ['announcements', 'admin', 'create'] as const,
      update: ['announcements', 'admin', 'update'] as const,
      delete: ['announcements', 'admin', 'delete'] as const,
    },
  },
  members: {
    students: {
      update: ['members', 'students', 'update'] as const,
      delete: ['members', 'students', 'delete'] as const,
    },
    admins: {
      create: ['members', 'admins', 'create'] as const,
      update: ['members', 'admins', 'update'] as const,
      delete: ['members', 'admins', 'delete'] as const,
    },
  },
  awards: {
    create: ['awards', 'create'] as const,
    update: ['awards', 'update'] as const,
    delete: ['awards', 'delete'] as const,
  },
  recruitment: {
    start: ['recruitment', 'start'] as const,
    update: ['recruitment', 'update'] as const,
  },
  semesters: {
    create: ['semesters', 'create'] as const,
  },
} as const;
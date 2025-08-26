/**
 * Query Keys Factory for Intra App
 * Based on TkDodo's recommendations for React Query key management
 */

// Auth related queries
const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
} as const;

// Study related queries
const studyKeys = {
  all: ['studies'] as const,
  lists: () => [...studyKeys.all, 'list'] as const,
  list: (params: unknown) => [...studyKeys.lists(), params] as const,
  details: () => [...studyKeys.all, 'detail'] as const,
  detail: (id: number) => [...studyKeys.details(), id] as const,
  lectures: (studyId: number) => [...studyKeys.detail(studyId), 'lectures'] as const,
  lecture: (studyId: number, lectureId: number) =>
    [...studyKeys.lectures(studyId), lectureId] as const,
  assignments: (studyId: number) => [...studyKeys.detail(studyId), 'assignments'] as const,
  assignment: (studyId: number, assignmentId: number) =>
    [...studyKeys.assignments(studyId), assignmentId] as const,
  attendanceCodes: (studyId: number) => [...studyKeys.detail(studyId), 'attendance-codes'] as const,
  my: () => [...studyKeys.all, 'my'] as const,
} as const;

// Announcement related queries
const announcementKeys = {
  all: ['announcements'] as const,
  lists: () => [...announcementKeys.all, 'list'] as const,
  list: (params: unknown) => [...announcementKeys.lists(), params] as const,
  details: () => [...announcementKeys.all, 'detail'] as const,
  detail: (id: number) => [...announcementKeys.details(), id] as const,
} as const;

const instructorAnnouncementKeys = {
  all: [...announcementKeys.all, 'instructor'] as const,
  lists: () => [...instructorAnnouncementKeys.all, 'list'] as const,
  list: (params: unknown) => [...instructorAnnouncementKeys.lists(), params] as const,
} as const;

const announcementKeysWithInstructor = {
  ...announcementKeys,
  instructor: instructorAnnouncementKeys,
} as const;

// Member related queries
const memberKeys = {
  all: ['members'] as const,
} as const;

const myMemberKeys = {
  all: [...memberKeys.all, 'my'] as const,
  introduction: () => [...myMemberKeys.all, 'introduction'] as const,
} as const;

const memberKeysWithMy = {
  ...memberKeys,
  my: myMemberKeys,
} as const;

// Award related queries
const awardKeys = {
  all: ['awards'] as const,
  lists: () => [...awardKeys.all, 'list'] as const,
  list: (params: unknown) => [...awardKeys.lists(), params] as const,
  details: () => [...awardKeys.all, 'detail'] as const,
  detail: (id: number) => [...awardKeys.details(), id] as const,
  my: () => [...awardKeys.all, 'my'] as const,
} as const;

// Recruitment related queries
const recruitmentKeys = {
  all: ['recruitment'] as const,
  applications: () => [...recruitmentKeys.all, 'applications'] as const,
} as const;

export const queryKeys = {
  auth: authKeys,
  studies: studyKeys,
  announcements: announcementKeysWithInstructor,
  members: memberKeysWithMy,
  awards: awardKeys,
  recruitment: recruitmentKeys,
} as const;

// Mutation keys for better organization
export const mutationKeys = {
  auth: {
    login: ['auth', 'login'] as const,
    logout: ['auth', 'logout'] as const,
  },
  studies: {
    create: ['studies', 'create'] as const,
    update: ['studies', 'update'] as const,
    delete: ['studies', 'delete'] as const,
    apply: ['studies', 'apply'] as const,
    lectures: {
      create: ['studies', 'lectures', 'create'] as const,
      update: ['studies', 'lectures', 'update'] as const,
      delete: ['studies', 'lectures', 'delete'] as const,
    },
    assignments: {
      create: ['studies', 'assignments', 'create'] as const,
      update: ['studies', 'assignments', 'update'] as const,
      delete: ['studies', 'assignments', 'delete'] as const,
    },
    attendanceCodes: {
      create: ['studies', 'attendance-codes', 'create'] as const,
      check: ['studies', 'attendance-codes', 'check'] as const,
    },
    announcements: {
      create: ['studies', 'announcements', 'create'] as const,
    },
  },
  announcements: {
    create: ['announcements', 'create'] as const,
    update: ['announcements', 'update'] as const,
    delete: ['announcements', 'delete'] as const,
    instructor: {
      update: ['announcements', 'instructor', 'update'] as const,
    },
  },
  members: {
    introduction: {
      update: ['members', 'introduction', 'update'] as const,
    },
  },
  awards: {
    create: ['awards', 'create'] as const,
    update: ['awards', 'update'] as const,
    delete: ['awards', 'delete'] as const,
  },
  recruitment: {
    apply: ['recruitment', 'apply'] as const,
    updateStatus: ['recruitment', 'update-status'] as const,
  },
} as const;

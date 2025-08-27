import { create } from 'zustand';
import { Semester, SelectOption } from '@hiarc-platform/shared';
import { semesterApi } from '@/features/semester/api/semester';

interface SemesterState {
  semesters: Semester[];
  semesterOptions: SelectOption[];
  selectedSemesterId: string | null;
  isLoading: boolean;
  error: string | null;
  fetchSemesters(): Promise<void>;
  getSemesterOptions(): SelectOption[];
  setSelectedSemester(semesterId: string): void;
  getSelectedSemester(): Semester | null;
  initializeWithCurrentSemester(): Promise<void>;
}

export const useSemesterStore = create<SemesterState>((set, get) => ({
  semesters: [],
  semesterOptions: [],
  selectedSemesterId: null,
  isLoading: false,
  error: null,

  fetchSemesters: async () => {
    set({ isLoading: true, error: null });
    try {
      const semesters = await semesterApi.GET_SEMESTER_LIST();
      const semesterOptions = semesters.map((semester) => ({
        label: `${semester.semesterYear}년 ${semester.semesterType === 'FIRST' ? '1학기' : '2학기'}`,
        value: semester.semesterId?.toString() || '',
      }));

      set({
        semesters,
        semesterOptions,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch semesters',
        isLoading: false,
      });
    }
  },

  initializeWithCurrentSemester: async () => {
    const currentState = get();

    // 이미 선택된 학기가 있으면 그대로 유지
    if (currentState.selectedSemesterId) {
      return;
    }

    set({ isLoading: true, error: null });
    
    try {
      // 먼저 학기 목록을 가져옵니다
      const semesters = await semesterApi.GET_SEMESTER_LIST();
      
      const semesterOptions = semesters.map((semester) => ({
        label: `${semester.semesterYear}년 ${semester.semesterType === 'FIRST' ? '1학기' : '2학기'}`,
        value: semester.semesterId?.toString() || '',
      }));

      let selectedSemesterId: string | null = null;

      try {
        // 현재 학기를 가져오려고 시도
        const currentSemesterResponse = await semesterApi.GET_CURRENT_SEMESTER();
        const currentSemesterId = currentSemesterResponse.currentSemester?.semesterId?.toString();
        
        if (currentSemesterId && semesterOptions.some(option => option.value === currentSemesterId)) {
          selectedSemesterId = currentSemesterId;
        }
      } catch (currentSemesterError) {
        console.warn('Failed to get current semester, will use latest semester:', currentSemesterError);
      }

      // 현재 학기를 가져오지 못했거나 목록에 없으면 가장 마지막(최신) 학기를 선택
      if (!selectedSemesterId && semesterOptions.length > 0) {
        selectedSemesterId = semesterOptions[semesterOptions.length - 1].value;
      }

      set({
        semesters,
        semesterOptions,
        selectedSemesterId,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to initialize semester',
        isLoading: false,
      });
    }
  },

  getSemesterOptions: () => get().semesterOptions,

  setSelectedSemester: (semesterId: string) => {
    set({ selectedSemesterId: semesterId });
  },

  getSelectedSemester: () => {
    const { semesters, selectedSemesterId } = get();
    return (
      semesters.find((semester) => semester.semesterId?.toString() === selectedSemesterId) || null
    );
  },
}));
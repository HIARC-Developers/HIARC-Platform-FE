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
  refreshSemesters(): Promise<void>;
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
      console.error('Failed to fetch semesters:', error);
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
      // 현재 학기와 전체 학기 목록을 병렬로 가져오기
      const [currentSemesterResponse, semesters] = await Promise.all([
        semesterApi.GET_CURRENT_SEMESTER(),
        semesterApi.GET_SEMESTER_LIST(),
      ]);

      const semesterOptions = semesters.map((semester) => ({
        label: `${semester.semesterYear}년 ${semester.semesterType === 'FIRST' ? '1학기' : '2학기'}`,
        value: semester.semesterId?.toString() || '',
      }));

      const currentSemesterId = currentSemesterResponse.currentSemester?.semesterId?.toString();

      set({
        semesters,
        semesterOptions,
        isLoading: false,
        // 현재 학기를 기본값으로 설정
        selectedSemesterId: currentSemesterId || semesterOptions[0]?.value || null,
      });
    } catch (error) {
      console.error('Failed to initialize with current semester:', error);
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

  refreshSemesters: async () => {
    const currentSelectedId = get().selectedSemesterId;
    try {
      const semesters = await semesterApi.GET_SEMESTER_LIST();
      const semesterOptions = semesters.map((semester) => ({
        label: `${semester.semesterYear}년 ${semester.semesterType === 'FIRST' ? '1학기' : '2학기'}`,
        value: semester.semesterId?.toString() || '',
      }));

      set({
        semesters,
        semesterOptions,
      });

      // 기존 선택된 학기가 여전히 존재하는지 확인하고, 없으면 첫 번째 학기로 설정
      const stillExists = semesterOptions.some(option => option.value === currentSelectedId);
      if (!stillExists && semesterOptions.length > 0) {
        set({ selectedSemesterId: semesterOptions[0].value });
      }
    } catch (error) {
      console.error('Failed to refresh semesters:', error);
    }
  },
}));

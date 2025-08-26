import { useEffect } from 'react';
import { useSemesterStore } from '@/stores/semester-store';
import { Semester } from '@hiarc-platform/shared';

export function useSemesterStoreInit(): void {
  const { initializeWithCurrentSemester, semesters } = useSemesterStore();

  useEffect(() => {
    // Only initialize if we don't have semester data yet
    if (semesters.length === 0) {
      initializeWithCurrentSemester();
    }
  }, [initializeWithCurrentSemester, semesters.length]);
}

// Hook to get selected semester information easily
export function useSelectedSemester(): {
  selectedSemester: Semester | null;
  selectedSemesterId: string | null;
} {
  const { getSelectedSemester, selectedSemesterId } = useSemesterStore();
  return {
    selectedSemester: getSelectedSemester(),
    selectedSemesterId,
  };
}

export { useSemesterStore };

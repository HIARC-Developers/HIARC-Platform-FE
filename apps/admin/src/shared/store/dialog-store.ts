import { create } from 'zustand';

interface DialogState {
  isUnauthorizedDialogOpen: boolean;
  showUnauthorizedDialog: () => void;
  hideUnauthorizedDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isUnauthorizedDialogOpen: false,
  showUnauthorizedDialog: () => set({ isUnauthorizedDialogOpen: true }),
  hideUnauthorizedDialog: () => set({ isUnauthorizedDialogOpen: false }),
}));
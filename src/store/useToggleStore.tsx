import { create } from "zustand";

interface ToggleState {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  toggle: () => void;
}

const useToggleStore = create<ToggleState>((set) => ({
  isOpen: false,
  setOpen: (value) => set({ isOpen: value }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useToggleStore;

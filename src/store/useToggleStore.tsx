import { create } from "zustand";

interface ToggleState {
  addTaskToggle: boolean;
  deleteTaskToggle: boolean;
  updateTitleToggle:boolean;
  updateDescriptionToggle: boolean;
  setOpen: (key: keyof Omit<ToggleState, "setOpen" | "toggle">, value: boolean) => void;
  toggle: (key: keyof Omit<ToggleState, "setOpen" | "toggle">) => void;
}

const useToggleStore = create<ToggleState>((set) => ({
  addTaskToggle: false,
  deleteTaskToggle: false,
  updateTitleToggle: false,
  updateDescriptionToggle:false,
  setOpen: (key, value) => set((state) => ({...state, [key]: value})),
  toggle: (key) => set((state) => ({ ...state ,[key]: !state[key] })),
}));

export default useToggleStore;

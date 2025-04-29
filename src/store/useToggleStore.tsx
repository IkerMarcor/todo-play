import {ToggleKey , Toggle } from "@/types/Toggle";
import { create } from "zustand";

interface ToggleState extends Toggle {
  setOpen: (key: ToggleKey, value: boolean) => void;
  toggle: (key: ToggleKey) => void;
}

const useToggleStore = create<ToggleState>((set) => ({
  createTaskToggle: false,
  deleteAllTaskToggle: false,
  updateTaskToggle: false,
  setOpen: (key, value) => set((state) => ({...state, [key]: value})),
  toggle: (key) => set((state) => ({ ...state ,[key]: !state[key] })),
}));

export default useToggleStore;

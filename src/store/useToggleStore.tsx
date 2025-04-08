import {ToggleKey ,ToggleBooleans } from "@/types/toggleTypes";
import { create } from "zustand";

interface ToggleState extends ToggleBooleans {
  setOpen: (key: ToggleKey, value: boolean) => void;
  toggle: (key: ToggleKey) => void;
}

const useToggleStore = create<ToggleState>((set) => ({
  addTaskToggle: false,
  deleteTaskToggle: false,
  updateTitleToggle: false,
  updateDescriptionToggle:false,
  updatePriorityToggle:false,
  setOpen: (key, value) => set((state) => ({...state, [key]: value})),
  toggle: (key) => set((state) => ({ ...state ,[key]: !state[key] })),
}));

export default useToggleStore;

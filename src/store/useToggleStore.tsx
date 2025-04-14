import {ToggleKey ,ToggleBooleans } from "@/types/toggleTypes";
import { create } from "zustand";

interface ToggleState extends ToggleBooleans {
  setOpen: (key: ToggleKey, value: boolean) => void;
  toggle: (key: ToggleKey) => void;
}

const useToggleStore = create<ToggleState>((set) => ({
  createTaskToggle: false,
  deleteTaskToggle: false,
  updateTaskToggle: false,
  setOpen: (key, value) => set((state) => ({...state, [key]: value})),
  toggle: (key) => set((state) => ({ ...state ,[key]: !state[key] })),
}));

export default useToggleStore;

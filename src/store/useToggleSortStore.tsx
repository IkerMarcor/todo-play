import {ToggleKey , Toggle } from "@/types/Sort";
import { create } from "zustand";

interface ToggleState extends Toggle {
  toggle: (key: ToggleKey) => void;
}

const useToggleSortStore = create<ToggleState>((set) => ({
  name: "ASC",
  date: "ASC",
  toggle: (key) => set((state) => ({ ...state ,[key]: state[key] === "ASC" ? "DESC" : "ASC" })),
}));

export default useToggleSortStore;
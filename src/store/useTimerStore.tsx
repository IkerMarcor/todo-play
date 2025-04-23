import { create } from "zustand";

interface TimerState {
  initTime: number;
  remainTime: number;
  isRunning: boolean;
  startReset: (initSeconds: number) => void;
  resumeReset: (initTime: number, remainTime: number) => void;
  resume: () => void;
  pause: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  initTime: 0,
  remainTime: 0,
  isRunning: false,

  startReset: (initTime) =>
    set({ initTime: initTime, remainTime: initTime, isRunning: true }),
  resumeReset: (initTime, remainTime) =>
    set({ initTime: initTime, remainTime: remainTime, isRunning: true }),
  resume: () => set({ isRunning: true }),
  pause: () => set({ isRunning: false }),
}));

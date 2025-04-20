import { create } from "zustand";

interface TimerState {
  initSeconds: number;
  seconds: number;
  isRunning: boolean;
  start: (initSeconds: number) => void;
  pause: () => void;
  resume: () => void;
  reset: (initValue: number) => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  initSeconds: 0,
  seconds: 0,
  isRunning: false,

  start: (initial) =>
    set({ initSeconds: initial, seconds: initial, isRunning: true }),
  pause: () => set({ isRunning: false }),
  resume: () => set({ isRunning: true }),
  reset: (initValue) => set({ seconds: initValue, isRunning: false }),
}));

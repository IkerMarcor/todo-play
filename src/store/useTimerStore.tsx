import { create } from "zustand";

interface TimerState {
  initTime: number;
  remainTime: number;
  isRunning: boolean;
  startReset: (initSeconds: number) => void;
  resume: (initial: number, remaining: number) => void;
  pause: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  initTime: 0,
  remainTime: 0,
  isRunning: false,

  startReset: (initial) =>
    set({ initTime: initial, remainTime: initial, isRunning: true }),
  resume: (initial, remaining) =>
    set({ initTime: initial, remainTime: remaining, isRunning: true }),
  pause: () => set({ isRunning: false }),
}));

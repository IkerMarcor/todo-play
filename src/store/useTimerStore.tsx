import { create } from "zustand";
import useTaskStore from "./useTaskStore";
import useSelectedTaskStore from "./useSelectedTaskStore";

interface TimerState {
  initTime: number;
  remainTime: number;
  startTime: number | null;
  isRunning: boolean;
  isCompleted: boolean;
  startReset: (initTime: number, remainTime: number) => void;
  resume: () => void;
  pause: () => void;
  reset: () => void;
  syncTime: () => void;
}

let timerRef: NodeJS.Timeout | null = null;

export const useTimerStore = create<TimerState>((set, get) => ({
  initTime: 0,
  remainTime: 0,
  startTime: null,
  isRunning: false,
  isCompleted: false,

  startReset: (initTime, remainTime) => {
    // Clear any existing timer
    if (timerRef) clearInterval(timerRef);

    const now = Date.now();
    set({
      initTime,
      remainTime,
      isRunning: true,
      isCompleted: false,
      startTime: now,
    });

    timerRef = setInterval(() => {
      get().syncTime();
    }, 500);
  },
  resume: () => {
    if (get().remainTime <= 0 || get().isRunning) return;
    const now = Date.now();
    set({
      isRunning: true,
      startTime: now - (get().initTime - get().remainTime) * 1000,
    });

    timerRef = setInterval(() => {
      get().syncTime();
    }, 500);
  },
  pause: () => {
    if (timerRef) {
      clearInterval(timerRef);
      timerRef = null;
    }
    const elapsed = Date.now() - (get().startTime ?? Date.now());
    const newRemain = Math.max(0, get().initTime - elapsed);

    const id = useSelectedTaskStore.getState().selectedTaskId;

    if (id) {
      useTaskStore.getState().updateTask(id, { remainTime: newRemain });
    }

    set({
      remainTime: newRemain,
      isRunning: false,
      startTime: null,
    });
  },
  reset: () => {
    if (timerRef) {
      clearInterval(timerRef);
      timerRef = null;
    }
    set({ remainTime: get().initTime, isRunning: false, startTime: null });
  },
  syncTime: () => {
    const { isRunning, initTime, startTime } = get();
    if (!isRunning || !startTime) return;

    const elapsed = (Date.now() - startTime) / 1000;
    const newRemain = Math.max(0, initTime - elapsed);

    if (newRemain <= 0) {
      clearInterval(timerRef!);
      timerRef = null;
      set({
        remainTime: 0,
        isRunning: false,
        isCompleted: true,
        startTime: null,
      });
    } else {
      set({ remainTime: newRemain });
    }
  },
}));

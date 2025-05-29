import { create } from "zustand";
import useTaskStore from "./useTaskStore";
import useSelectedTaskStore from "./useSelectedTaskStore";

interface TimerState {
  initTime: number;
  remainTime: number;
  isRunning: boolean;
  isCompleted: boolean;
  startReset: (initSeconds: number, remainTime: number) => void;
  resume: () => void;
  pause: () => void;
  reset: () => void;
}

let timerRef: NodeJS.Timeout | null = null;

export const useTimerStore = create<TimerState>((set) => ({
  initTime: 0,
  remainTime: 0,
  isRunning: false,
  isCompleted: false,

  startReset: (initSeconds: number, remainTime: number) => {
    // Clear any existing timer
    if (timerRef) {
      clearInterval(timerRef);
      timerRef = null;
    }

    set({
      initTime: initSeconds,
      remainTime: remainTime,
      isRunning: true,
      isCompleted: false,
    });

    timerRef = setInterval(() => {
      const remainTimeRef = useTimerStore.getState().remainTime;
      const newRemainTimeRef = parseFloat((remainTimeRef - 0.1).toFixed(1));
      if (newRemainTimeRef > 0) {
        set({ remainTime: newRemainTimeRef });
      } else {
        clearInterval(timerRef!);
        timerRef = null;
        // Reset the timer state when time is up
        set({ remainTime: 0, isRunning: false, isCompleted: true });
      }
    }, 100);
  },
  resume: () => {
    const remainTime = useTimerStore.getState().remainTime;
    const isRunning = useTimerStore.getState().isRunning;

    if (remainTime > 0 && !isRunning) {
      set({ isRunning: true });

      timerRef = setInterval(() => {
        const remainTimeRef = useTimerStore.getState().remainTime;
        const newRemainTimeRef = parseFloat((remainTimeRef - 0.1).toFixed(1));
        if (newRemainTimeRef > 0) {
          set({ remainTime: newRemainTimeRef });
        } else {
          clearInterval(timerRef!);
          timerRef = null;
          // Reset the timer state when time is up
          set({ remainTime: 0, isRunning: false });
        }
      }, 100);
    }
  },
  pause: () => {
    if (timerRef) {
      clearInterval(timerRef);
      timerRef = null;
    }

    const id = useSelectedTaskStore.getState().selectedTaskId;

    if (id) {
      const remainTime = useTimerStore.getState().remainTime;
      useTaskStore.getState().updateTask(id, { remainTime });
      set({ isRunning: false });
    }
  },
  reset: () => {
    if (timerRef) {
      clearInterval(timerRef);
      timerRef = null;
    }
    const initTime = useTimerStore.getState().initTime;
    set({ remainTime: initTime, isRunning: false });
  },
}));

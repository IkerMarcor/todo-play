import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Timer } from "@/types/Timer";

interface TimerState {
  timers: Record<number, Timer>;
  createTimer: (id: number, time: number) => void;
  updateTimer: (id: number, updatedData: Partial<Omit<Timer, "id">>) => void;
  deleteTimer: (id: number) => void;
  deleteAllTimer: () => void;
  startReset: (id: number) => void;
  resume: (id: number) => void;
  pause: (id: number) => void;
  syncTime: (id: number) => void;
}

let timerRef: Record<number, NodeJS.Timeout> = {};

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      timers: {},

      createTimer: (id, time) => {
        set((state) => ({
          timers: {
            ...state.timers,
            [id]: {
              id,
              time,
              elapsedTime: 0,
              remainTime: time,
              isRunning: false,
              playedAt: null,
              isCompleted: false,
            },
          },
        }));
      },

      updateTimer: (id, updatedData) => {
        set((state) => {
          const timer = state.timers[id];
          if (!timer) return state;
          return {
            timers: {
              ...state.timers,
              [id]: {
                ...timer,
                ...updatedData,
              },
            },
          };
        });
      },

      deleteTimer: (id) => {
        clearInterval(timerRef[id]);
        delete timerRef[id];

        set((state) => {
          const updatedTimers = { ...state.timers };
          delete updatedTimers[id];
          return { timers: updatedTimers };
        });
      },

      deleteAllTimer: () => {
        Object.values(timerRef).forEach(clearInterval);
        timerRef = {};
        set(() => ({ timers: {} }));
      },

      startReset: (id) => {
        clearInterval(timerRef[id]);
        const timer = get().timers[id];
        if (!timer) return;

        const now = Date.now();

        get().updateTimer(id, {
          elapsedTime: 0,
          remainTime: timer.time,
          isCompleted: false,
          isRunning: true,
          playedAt: now,
        });

        timerRef[id] = setInterval(() => {
          get().syncTime(id);
        }, 500);
      },

      resume: (id) => {
        const timer = get().timers[id];
        if (!timer || timer.isCompleted || timer.elapsedTime >= timer.time)
          return;

        clearInterval(timerRef[id]);
        const now = Date.now();

        get().updateTimer(id, {
          isRunning: true,
          playedAt: now,
        });

        timerRef[id] = setInterval(() => {
          get().syncTime(id);
        }, 500);
      },

      pause: (id) => {
        clearInterval(timerRef[id]);
        delete timerRef[id];

        const timer = get().timers[id];
        if (!timer || !timer.isRunning || !timer.playedAt) return;

        const additionalElapsed = (Date.now() - timer.playedAt) / 1000;
        const newElapsed = timer.elapsedTime + additionalElapsed;
        const newRemain = Math.max(0, timer.time - newElapsed);

        get().updateTimer(id, {
          elapsedTime: newElapsed,
          remainTime: newRemain,
          isRunning: false,
          playedAt: null,
        });
      },

      syncTime: (id) => {
        const timer = get().timers[id];
        if (!timer || !timer.isRunning || !timer.playedAt) return;

        const additionalElapsed = (Date.now() - timer.playedAt) / 1000;
        const totalElapsed = timer.elapsedTime + additionalElapsed;
        const remainTime = Math.max(0, timer.time - totalElapsed);

        if (remainTime <= 0) {
          clearInterval(timerRef[id]);
          delete timerRef[id];
          get().updateTimer(id, {
            elapsedTime: timer.time,
            remainTime: 0,
            isCompleted: true,
            isRunning: false,
            playedAt: null,
          });
        } else {
          get().updateTimer(id, {
            remainTime,
          });
        }
      },
    }),
    {
      name: "timer-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Timer } from "@/types/Timer";

interface TimerState {
  timers: Record<number, Timer>;
  isCompleted: boolean;
  isRinging: boolean;
  createTimer: (id: number, time: number) => void;
  updateTimer: (id: number, updatedData: Partial<Omit<Timer, "id">>) => void;
  deleteTimer: (id: number) => void;
  deleteAllTimer: () => void;
  startReset: (id: number) => void;
  resume: (id: number) => void;
  pause: (id: number) => void;
  reset: (id: number) => void;
  addTime: (id: number) => void;
  syncTime: (id: number) => void;
  stopAlarm: () => void;
}

let timerRef: Record<number, NodeJS.Timeout> = {};

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      timers: {},
      isCompleted: false,
      isRinging: false,

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
          let timer = state.timers[id];
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
          let updatedTimers = { ...state.timers };
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
        let timer = get().timers[id];
        if (!timer) return;

        let now = Date.now();

        get().updateTimer(id, {
          elapsedTime: 0,
          remainTime: timer.time,
          isCompleted: false,
          isRunning: true,
          playedAt: now,
        });

        set({ isCompleted: false });

        timerRef[id] = setInterval(() => {
          get().syncTime(id);
        }, 500);
      },

      resume: (id) => {
        let timer = get().timers[id];
        if (!timer || timer.isCompleted || timer.elapsedTime >= timer.time)
          return;

        clearInterval(timerRef[id]);
        let now = Date.now();

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

        let timer = get().timers[id];
        if (!timer || !timer.isRunning || !timer.playedAt) return;

        let additionalElapsed = (Date.now() - timer.playedAt) / 1000;
        let newElapsed = timer.elapsedTime + additionalElapsed;
        let newRemain = Math.max(0, timer.time - newElapsed);

        get().updateTimer(id, {
          elapsedTime: newElapsed,
          remainTime: newRemain,
          isRunning: false,
          playedAt: null,
        });
      },
      reset: (id) => {
        set({ isCompleted: false });
        get().updateTimer(id, {
          elapsedTime: 0,
          isRunning: false,
          playedAt: null,
          isCompleted: false,
        });
      },
      addTime: (id) => {
        let timer = get().timers[id];
        let newTime = timer.time * 0.25;
        set({ isCompleted: false });
        get().updateTimer(id, {
          remainTime: newTime,
          isCompleted: false,
          elapsedTime: timer.time - newTime,
        });
        get().resume(id);
      },
      syncTime: (id) => {
        let timer = get().timers[id];
        if (!timer || !timer.isRunning || !timer.playedAt) return;

        let additionalElapsed = (Date.now() - timer.playedAt) / 1000;
        let totalElapsed = timer.elapsedTime + additionalElapsed;
        let remainTime = Math.max(0, timer.time - totalElapsed);

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
          set({ isCompleted: true, isRinging: true });
        } else {
          get().updateTimer(id, {
            remainTime,
          });
        }
      },
      stopAlarm: () => {
        set({ isRinging: false });
      },

    }),
    {
      name: "timer-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

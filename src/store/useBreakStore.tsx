import { Task } from "@/types/Task";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useTimerStore } from "./useTimerStore";
import { toast } from "sonner";
import { convertTimeInSeconds } from "@/middleware";
import useTaskStore from "./useTaskStore";
import useMergeStore from "./useMergeStore";

interface BreakStore {
  breaks: Record<number, Task>;
  createBreak: () => void;
  deleteBreak: (id: number) => void;
  updateBreak: (id: number, updatedData: Partial<Omit<Task, "id">>) => void;
  deleteAllBreaks: () => void;
}

const createNewTimer = useTimerStore.getState().createTimer;
const deleteTimer = useTimerStore.getState().deleteTimer;

const useBreakStore = create<BreakStore>()(
  persist(
    (set, get) => ({
      breaks: {} as Record<number, Task>,

      createBreak: () => {
        const tasks = useTaskStore.getState().tasks;
        const tasksLen = Object.values(tasks).length;

        if (tasksLen <= 0) {
          toast.warning("Please add a task before adding a break.");
          return;
        }

        const id = Date.now();
        const time = convertTimeInSeconds("0.25"); // default break time of 15 minutes
        const newBreak: Task = {
          id,
          index: useMergeStore.getState().getMergedLength(),
          name: "Break",
          description: "Take a break",
          priority: "N",
          state: "notStarted",
          time: time,
          createdAt: id,
          type: "break", // type for breaks
          locked: true, // breaks are locked by default
        };

        const breaks = Object.values(get().breaks);

        if (breaks.length > 0) {
          const prevBreak = breaks[breaks.length - 1];
          const breakSpacing = newBreak.index - prevBreak.index;

          if (breakSpacing === 1) {
            toast.warning("You cannot add a break next to each other");
            return;
          }
        }

        createNewTimer(id, time);
        
        // First add the break to our store
        set((state) => ({
          breaks: {
            ...state.breaks,
            [id]: newBreak,
          },
        }));

        // Update the merged list
        // Then merge the tasks after the break is added
        useTaskStore.getState().mergeTasksWithBreaks();
      },
      deleteBreak: (id) => {
        deleteTimer(id);
        set((state) => {
          const updatedBreaks = { ...state.breaks };
          delete updatedBreaks[id];
          return { breaks: updatedBreaks };
        });
      },
      updateBreak: (id, updatedData) => {
        set((state) => ({
          breaks: {
            ...state.breaks,
            [id]: {
              ...state.breaks[id],
              ...updatedData,
            },
          },
        }));
      },
      deleteAllBreaks: () => {
        set(() => ({
          breaks: {},
        }));
      },
    }),
    {
      name: "break-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBreakStore;

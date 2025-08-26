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
    (set) => ({
      breaks: {} as Record<number, Task>,

      createBreak: () => {
        const mergedList = Object.values(useTaskStore.getState().tasks);
        const mergedLength = mergedList.length;

        if (mergedLength <= 0) {
          toast.warning("Please add a task before adding a break.");
          return;
        }

        const id = Date.now();
        const time = convertTimeInSeconds("0.25"); // default break time of 15 minutes
        const newBreak: Task = {
          id,
          name: "Break",
          description: "Take a break",
          priority: "N",
          state: "notStarted",
          time: time,
          createdAt: id,
          type: "break", // type for breaks
          locked: true, // breaks are locked by default
        };

        if (mergedLength > 0) {
          const prevItem = mergedList[mergedLength - 1];

          if (prevItem.type === "break") {
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
        useMergeStore.getState().updateMergedList([newBreak]);
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

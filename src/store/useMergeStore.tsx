import { Task } from "@/types/Task";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface MergeStore {
  mergedList: Task[];
  deleteMergedList: () => void;
  updateMergedList: (items: Task[]) => void;
  updateTaskState: (id: number, newState: string) => void;
}

const useMergeStore = create<MergeStore>()(
  persist(
    (set) => ({
      mergedList: [] as Task[],

      deleteMergedList: () => set({ mergedList: [] }),
      updateMergedList: (newItems: Task[]) => {
        set((state) => {
          const currentList = Array.isArray(state.mergedList) ? state.mergedList : [];
          
          // Filter out any existing tasks with the same IDs to prevent duplicates
          const existingIds = new Set(currentList.map(task => task.id));
          const newUniqueItems = newItems.filter(task => !existingIds.has(task.id));
          
          // Combine existing and new tasks
          return {
            mergedList: [...currentList, ...newUniqueItems]
          };
        });
      },
      updateTaskState: (id: number, newState: string) => {
        set((storeState) => {
          // Ensure we're working with an array
          const tasks = Array.isArray(storeState.mergedList) 
            ? storeState.mergedList 
            : Object.values(storeState.mergedList as Record<number, Task>);

          const taskIndex = tasks.findIndex(task => task.id === id);
          if (taskIndex === -1) return storeState;

          const updatedTasks = [...tasks];
          updatedTasks[taskIndex] = {
            ...updatedTasks[taskIndex],
            state: newState
          };

          return {
            mergedList: updatedTasks
          };
        });
      },
    }),
    {
      name: "merge-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        mergedList: Array.isArray(state.mergedList) ? state.mergedList : []
      })
    }
  )
);

export default useMergeStore;

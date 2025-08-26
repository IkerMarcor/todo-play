import { Task } from "@/types/Task";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface MergeStore {
  mergedList: Record<number, Task>;
  deleteMergedList: () => void;
  updateMergedList: (items: Task[]) => void;
}

const useMergeStore = create<MergeStore>()(
  persist(
    (set) => ({
      mergedList: {} as Record<number, Task>,

      deleteMergedList: () => set({ mergedList: {} as Record<number, Task> }),
      updateMergedList: (newitem: Task[]) => {
        const currentMergedList = Object.values(
          useMergeStore.getState().mergedList
        );
        const mergedListArray = [...currentMergedList, ...newitem];
        set({ mergedList: mergedListArray });
      },
    }),
    {
      name: "merge-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useMergeStore;

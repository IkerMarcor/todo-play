import { Task } from "@/types/Task";
import { create } from "zustand";
import useTaskStore from "./useTaskStore";
import useBreakStore from "./useBreakStore";

interface MergeStore {
  getMergedList: () => Task[];
  getMergedLength: () => number;
}

const useMergeStore = create<MergeStore>()((get) => ({
  getMergedList: () => {
    const tasks = [...Object.values(useTaskStore.getState().tasks)];
    const breaks = Object.values(useBreakStore.getState().breaks);

    // Sort breaks by their index to ensure proper insertion order
    const sortedBreaks = breaks.sort((a, b) => (a.index || 0) - (b.index || 0));

    // Create a new array with tasks and insert breaks at their indices
    const merged = [...tasks];
    sortedBreaks.forEach((brk) => {
      const insertIndex = brk.index || merged.length;
      merged.splice(insertIndex, 0, brk);
    });

    return merged;
  },

  getMergedLength: () => {
    const tasks = Object.values(useTaskStore.getState().tasks);
    const breaks = Object.values(useBreakStore.getState().breaks);
    return tasks.length + breaks.length;
  },
}));

export default useMergeStore;

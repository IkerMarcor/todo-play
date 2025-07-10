import { Task } from "@/types/Task";
import { create } from "zustand";
import useTaskStore from "./useTaskStore";
import useBreakStore from "./useBreakStore";

interface MergeStore {
  mergedActivities: Record<number, Task>;
  merge: () => void;
  mergedList: () => Task[];
  mergedLen: () => number;
}

const useMergeStore = create<MergeStore>()((set, get) => ({
  mergedActivities: {} as Record<number, Task>,
  merge: () => {
    const { tasks } = useTaskStore.getState();
    const { breaks } = useBreakStore.getState();
    // Merging the two objects into one flat Record<number, Task>
    const merged = {
      ...tasks,
      ...breaks,
    };

    set(() => ({
      mergedActivities: merged,
    }));
  },
  mergedList: () => {
    const tasks = [...Object.values(useTaskStore.getState().tasks)];
    const breaks = Object.values(useBreakStore.getState().breaks);

    breaks.sort((a, b) => a.index - b.index);

    breaks.forEach((brk) => {
      tasks.splice(brk.index, 0, brk);
    });

    return tasks;
  },

  mergedLen: () => {
    return get().mergedList().length;
  },
}));

export default useMergeStore;

import { Task } from "@/types/Task";
import { create } from "zustand";
import { Sort } from "@/types/Sort";
import { Filter } from "@/types/Filter";
import useTaskStore from "@/store/useTaskStore";

interface TaskStore {
  backupTasks: Record<number, Task>;
  sortBy: Sort | null;
  filterBy: Filter | null;
  createBackup: (tasks: Record<number, Task>) => void;
  updateBackup: (id: number, updatedData: Partial<Omit<Task, "id">>) => void;
  deleteBackup: () => void;
  filterTasks: (filterBy: Filter) => void;
  sortTasks: (sortBy: Sort) => void;
  clearFilters: () => void;
}

const useSortStore = create<TaskStore>()((set) => ({
  backupTasks: {},
  sortBy: null,
  filterBy: null,

  createBackup: (tasks) =>
    set(() => ({
      backupTasks: tasks,
    })),
  updateBackup: (id, updatedData) => {
    set((state) => ({
      backupTasks: {
        ...state.backupTasks,
        [id]: {
          ...state.backupTasks[id],
          ...updatedData,
        },
      },
    }));
  },
  deleteBackup: () =>
    set(() => ({
      backupTasks: {},
    })),
  filterTasks: (filterBy) => {
    if (filterBy === useSortStore.getState().filterBy) return;

    const tasks = useTaskStore.getState().tasks;
    const { setTasks } = useTaskStore.getState();
    const backupTasks = useSortStore.getState().backupTasks;

    //create backup of tasks if not already created
    if (!backupTasks || Object.keys(backupTasks).length === 0) {
      set({ backupTasks: tasks });
    }

    const filtered = Object.entries(backupTasks).filter(([_, task]) => {
      return filterBy === "pending"
        ? task.status !== "completed"
        : task.status === filterBy;
    });

    if (filtered.length === 0) return;

    set({ filterBy: filterBy });
    setTasks(Object.fromEntries(filtered));
  },
  sortTasks: (sortBy) => {
    if (sortBy === useSortStore.getState().sortBy) return;

    const tasks = useTaskStore.getState().tasks;
    const { setTasks } = useTaskStore.getState();
    const backupTasks = useSortStore.getState().backupTasks;

    if (Object.keys(tasks).length < 2) return;

    //create backup of tasks if not already created
    if (!backupTasks || Object.keys(backupTasks).length === 0) {
      set({ backupTasks: tasks });
    }

    const sortedArray = Object.entries(tasks).sort(([, a], [, b]) => {
      const aVal = a[sortBy as keyof Task];
      const bVal = b[sortBy as keyof Task];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return aVal - bVal;
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return aVal.localeCompare(bVal);
      }

      return 0; // fallback in case of mismatched types or undefined values
    });

    set({ sortBy: sortBy });
    setTasks(Object.fromEntries(sortedArray));
  },
  clearFilters: () => {
    const { setTasks } = useTaskStore.getState();
    const { backupTasks } = useSortStore.getState();
    set({ filterBy: null, sortBy: null });
    if (!backupTasks || Object.keys(backupTasks).length === 0) return;
    setTasks(backupTasks);
  },
}));

export default useSortStore;

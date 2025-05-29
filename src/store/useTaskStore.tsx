import { Task } from "@/types/Task";
import { create } from "zustand";
import useBackupStore from "@/store/useBackupStore";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

interface TaskStore {
  tasks: Record<number, Task>;
  sortBy: string | null;
  filterBy: string | null;
  createTask: (
    name: string,
    description: string,
    priority: string,
    time: number,
    status: string
  ) => void;
  deleteTask: (id: number) => void;
  deleteAllTask: () => void;
  updateTask: (id: number, updatedData: Partial<Omit<Task, "id">>) => void;
  filterTasks: (filterBy: string) => Record<number, Task> | undefined;
  sortTasks: (sortBy: string) => void;
  clearFilters: () => void;
}

const useTaskStore = create<TaskStore>()(
  //local storage middleware from zustand
  persist(
    (set) => ({
      tasks: {},
      sortBy: null,
      filterBy: null,

      createTask: (name, description, priority, time, status) => {
        const id = Date.now();
        const createdAt = Date.now();
        const newTask: Task = {
          id,
          name,
          description,
          priority,
          time,
          remainTime: time,
          status,
          createdAt,
        };
        useBackupStore.getState().addTask(newTask);
        set((state) => ({
          tasks: {
            ...state.tasks,
            [id]: newTask,
          },
        }));
      },
      deleteTask: (id) => {
        useBackupStore.getState().deleteTask(id);
        set((state) => {
          const updatedTasks = { ...state.tasks };
          delete updatedTasks[id];
          return { tasks: updatedTasks };
        });
      },
      deleteAllTask: () => {
        useBackupStore.getState().deleteBackup();
        set(() => ({
          tasks: {},
        }));
      },
      updateTask: (id, updatedData) => {
        useBackupStore.getState().updateBackup(id, updatedData);
        set((state) => ({
          tasks: {
            ...state.tasks,
            [id]: {
              ...state.tasks[id],
              ...updatedData,
            },
          },
        }));
      },
      filterTasks: (filterBy) => {
        const tasks = useTaskStore.getState().tasks;
        let backupTasks = useBackupStore.getState().backupTasks;

        if (!backupTasks || Object.keys(backupTasks).length === 0) {
          useBackupStore.getState().createBackup(tasks);
          backupTasks = useBackupStore.getState().backupTasks;
        }

        const filtered = Object.entries(backupTasks).filter(([_, task]) => {
          switch (filterBy) {
            case "completed":
              return task.status === "completed";
            case "pending":
              return task.status !== "completed";
            case "all":
              return true;
            default:
              return true;
          }
        });

        if (filtered.length === 0) {
          toast.info(`No ${filterBy} tasks found.`);
          return;
        }

        set({ filterBy: filterBy });
        set({ tasks: Object.fromEntries(filtered) });
        return Object.fromEntries(filtered);
      },
      sortTasks: (sortBy) => {
        if (sortBy === useTaskStore.getState().sortBy) return;

        const tasks = useTaskStore.getState().tasks;
        const backupTasks = useBackupStore.getState().backupTasks;
        const createBackup = useBackupStore.getState().createBackup;

        if (Object.keys(tasks).length < 2) return;

        if (!backupTasks || Object.keys(backupTasks).length === 0) {
          createBackup(tasks);
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
        set({ tasks: Object.fromEntries(sortedArray) });
      },
      clearFilters: () => {
        const backupTasks = useBackupStore.getState().backupTasks;
        if (!backupTasks || Object.keys(backupTasks).length === 0) {
          toast.error("No backup found");
          return;
        }
        set({ tasks: backupTasks, filterBy: null, sortBy: null });
        useBackupStore.getState().deleteBackup();
        toast.success("Filters cleared");
      },
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTaskStore;

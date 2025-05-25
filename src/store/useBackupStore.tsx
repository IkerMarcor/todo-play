import { Task } from "@/types/Task";
import { create } from "zustand";

interface BackupStore {
  backupTasks: Record<number, Task>;
  addTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  createBackup: (tasks: Record<number, Task>) => void;
  updateBackup: (id: number, updatedData: Partial<Omit<Task, "id">>) => void;
  deleteBackup: () => void;
}

const useBackupStore = create<BackupStore>()((set) => ({
  backupTasks: {},

  addTask: (task) =>
    set((state) => ({
      backupTasks: {
        ...state.backupTasks,
        [task.id]: task,
      },
    })),
  deleteTask: (id) =>
    set((state) => {
      const updatedTasks = { ...state.backupTasks };
      delete updatedTasks[id];
      return { backupTasks: updatedTasks };
    }
  ),
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
}));

export default useBackupStore;

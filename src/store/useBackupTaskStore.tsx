import { Task } from "@/types/Task";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BackupTaskStore {
  backupTasks: Record<number, Task>;
  addTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  createBackup: (tasks: Record<number, Task>) => void;
  updateBackup: (id: number, updatedData: Partial<Omit<Task, "id">>) => void;
  deleteBackup: () => void;
}

const useBackupTaskStore = create<BackupTaskStore>()(
  persist(
    (set) => ({
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
        }),
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
    }),
    {
      name: "backup-task-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBackupTaskStore;

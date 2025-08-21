import { Task } from "@/types/Task";
import { create } from "zustand";
import useBackupStore from "@/store/useBackupTaskStore";
import { persist, createJSONStorage } from "zustand/middleware";
import { useTimerStore } from "./useTimerStore";
import { toast } from "sonner";
import useMergeStore from "./useMergeStore";
import useBreakStore from "./useBreakStore";

interface TaskStore {
  tasks: Record<number, Task>;
  sortBy: string | null;
  filterBy: string | null;
  createTask: (
    name: string,
    description: string,
    priority: string,
    time: number,
    status: string,
    locked: boolean
  ) => void;
  deleteTask: (id: number) => void;
  deleteAllTask: () => void;
  updateTask: (id: number, updatedData: Partial<Omit<Task, "id">>) => void;
  filterTasks: (filterBy: string) => Record<number, Task> | undefined;
  sortTasks: (sortBy: string) => Record<number, Task> | undefined;
  clearFilters: () => void;
  mergeTasksWithBreaks: () => void;
}

const createNewTimer = useTimerStore.getState().createTimer;
const deleteTimer = useTimerStore.getState().deleteTimer;
const deleteAllTimer = useTimerStore.getState().deleteAllTimer;
// const backupTasks = useBackupStore.getState().backupTasks; the reason this is not used is because it is not updated in real-time.
const addTaskToBackup = useBackupStore.getState().addTask;
const deleteTaskFromBackup = useBackupStore.getState().deleteTask;
const deleteBackup = useBackupStore.getState().deleteBackup;
const updateTaskInBackup = useBackupStore.getState().updateBackup;

const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: {} as Record<number, Task>,
      sortBy: null,
      filterBy: null,

      createTask: (name, description, priority, time, state, locked) => {
        const id = Date.now();
        const newTask: Task = {
          id,
          index: Object.keys(get().tasks).length,
          name,
          description,
          priority,
          state,
          time,
          locked,
          createdAt: id,
          type: "task", // default type for tasks
        };
        createNewTimer(id, time);
        addTaskToBackup(newTask);
        set((state) => ({
          tasks: {
            ...state.tasks,
            [id]: newTask,
          },
        }));
      },
      deleteTask: (id) => {
        deleteTaskFromBackup(id);
        deleteTimer(id);
        set((state) => {
          const updatedTasks = { ...state.tasks };
          delete updatedTasks[id];
          return { tasks: updatedTasks };
        });
      },
      deleteAllTask: () => {
        deleteBackup();
        deleteAllTimer();
        set(() => ({
          tasks: {},
        }));
      },
      updateTask: (id, updatedData) => {
        updateTaskInBackup(id, updatedData);
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
        let tasks = get().tasks;

        let filtered = Object.entries(tasks).filter(([_, task]) => {
          switch (filterBy) {
            case "completed":
              return task.state === "completed";
            case "pending":
              return task.state !== "completed";
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
        let tasks = get().tasks;

        let sortedArray = Object.entries(tasks).sort(([, a], [, b]) => {
          let aVal = a[sortBy as keyof Task];
          let bVal = b[sortBy as keyof Task];
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
        return Object.fromEntries(sortedArray);
      },
      clearFilters: () => {
        const backupTasks = useBackupStore.getState().backupTasks; // This makes the backupTasks update in real-time, so we can use the last state.
        if (!backupTasks || Object.keys(backupTasks).length === 0) {
          toast.error("No backup found");
          return;
        }
        set({ tasks: backupTasks, filterBy: null, sortBy: null });
        toast.success("Filters cleared");
      },

      mergeTasksWithBreaks: () => {
        const { tasks } = get();
        const breaks = useBreakStore.getState().breaks;
        
        // Convert tasks to array and create a copy to avoid mutating the original
        const taskArray = [...Object.values(tasks)];
        const breakArray = Object.values(breaks) as Task[];
      
        // Sort breaks by their index to ensure proper insertion order
        const sortedBreaks = breakArray.sort((a: Task, b: Task) => ((a.index || 0) - (b.index || 0)));
      
        // Insert breaks at their specified indices
        sortedBreaks.forEach((breakItem: Task) => {
          const insertIndex = breakItem.index || taskArray.length;
          taskArray.splice(insertIndex, 0, breakItem);
        });
      
        // Convert array back to Record and update the store
        const mergedTasks = Object.fromEntries(
          taskArray.map((task) => [task.id, task])
        ) as Record<number, Task>;
        
        set({ tasks: mergedTasks });
      }
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTaskStore;

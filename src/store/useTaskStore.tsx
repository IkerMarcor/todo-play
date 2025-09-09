import { Task } from "@/types/Task";
import { create } from "zustand";
import useBackupStore from "@/store/useBackupTaskStore";
import { persist, createJSONStorage } from "zustand/middleware";
import { useTimerStore } from "./useTimerStore";
import { toast } from "sonner";

interface TaskStore {
  tasks: Record<number, Task>;
  visibleTasks: Task[];
  sortBy: string | null;
  filterBy: string | null;
  createTask: (
    name: string,
    description: string,
    priority: string,
    time: number,
    locked: boolean
  ) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, updatedData: Partial<Omit<Task, "id">>) => void;
  deleteAllTasks: () => void;
  updateAllTasks: (updatedData: Partial<Omit<Task, "id">>) => void;
  filterTasks: (filterBy: string) => void;
  sortTasks: (sortBy: string) => void;
  clearFilters: () => void;
  appendTask: (task: Task) => void;
}

const createNewTimer = useTimerStore.getState().createTimer;
const deleteTimer = useTimerStore.getState().deleteTimer;
const deleteAllTimer = useTimerStore.getState().deleteAllTimer;
const addTaskToBackup = useBackupStore.getState().addTask;
const deleteTaskFromBackup = useBackupStore.getState().deleteTask;
const deleteBackup = useBackupStore.getState().deleteBackup;
const updateTaskInBackup = useBackupStore.getState().updateBackup;

const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: {} as Record<number, Task>,
      visibleTasks: [] as Task[], // mirror of tasks initially
      sortBy: null,
      filterBy: null,

      createTask: (name, description, priority, time, locked) => {
        const id = Date.now();
        const newTask: Task = {
          id,
          name,
          description,
          priority,
          state: "notStarted",
          time,
          locked,
          createdAt: id,
          type: "task",
        };
        createNewTimer(id, time);
        addTaskToBackup(newTask);
        get().appendTask(newTask);
      },

      deleteTask: (id: number) => {
        deleteTaskFromBackup(id);
        deleteTimer(id);
        set((state) => {
          const updated = { ...state.tasks };
          delete updated[id];
          return { tasks: updated, visibleTasks: Object.values(updated) };
        });
      },

      updateTask: (id: number, updatedData: Partial<Omit<Task, "id">>) => {
        updateTaskInBackup(id, updatedData);
        set((state) => {
          const updated = { ...state.tasks };
          updated[id] = { ...updated[id], ...updatedData };
          return { tasks: updated, visibleTasks: Object.values(updated) };
        });
      },

      deleteAllTasks: () => {
        deleteBackup();
        deleteAllTimer();
        set(() => ({ tasks: [], visibleTasks: [] }));
      },

      updateAllTasks: (updatedData: Partial<Omit<Task, "id">>) => {
        const tasks = Object.values(get().tasks);
        const updated = tasks.map((task) => ({ ...task, ...updatedData }));
        set({
          tasks: Object.fromEntries(updated.map((task) => [task.id, task])),
          visibleTasks: updated,
        });
      },

      filterTasks: (filterBy: string) => {
        const tasks = Object.values(get().tasks);
        const filtered = tasks.filter((task) => {
          if (task.type === "break") return false;
          switch (filterBy) {
            case "Pending":
              return task.state !== "completed";
            case "Completed":
              return task.state === "completed";
            case "A":
            case "B":
            case "C":
              return task.priority === filterBy;
            case "All":
            default:
              return true;
          }
        });

        if (filtered.length === 0) {
          toast.info(`No ${filterBy} tasks found.`);
          return;
        }

        set({ filterBy, visibleTasks: filtered });
      },

      sortTasks: (sortBy: string) => {
        const tasks = [...get().visibleTasks]; // sort only visible list
        const sorted = tasks.sort((a, b) => {
          switch (sortBy) {
            case "name":
              return a.name.localeCompare(b.name);
            case "priority":
              return a.priority.localeCompare(b.priority);
            case "createdAt":
              return a.createdAt - b.createdAt;
            case "time":
              return a.time - b.time;
            default:
              return 0;
          }
        });

        set({ sortBy, visibleTasks: sorted });
      },

      clearFilters: () => {
        const tasks = Object.values(get().tasks);
        set({ visibleTasks: tasks, filterBy: null, sortBy: null });
        toast.success("Filters cleared");
      },

      appendTask: (task: Task) => {
        set((state) => {
          const updated = { ...state.tasks, [task.id]: task };
          return { tasks: updated, visibleTasks: Object.values(updated) };
        });
      },
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTaskStore;

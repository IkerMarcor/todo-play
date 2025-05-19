import { Task } from "@/types/Task";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TaskStore {
  tasks: Record<number, Task>;
  createTask: (
    name: string,
    description: string,
    priority: string,
    time: string,
    status: string,
  ) => void;
  deleteTask: (id: number) => void;
  deleteAllTask: () => void;
  updateTask: (id: number, updatedData: Partial<Omit<Task, "id">>) => void;
  sortTasks: (sortBy: "name" | "date" | "priority" | "duration") => void;
}

const useTaskStore = create<TaskStore>()(
  //local storage middleware from zustand
  persist(
    (set) => ({
      tasks: {},
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
        set((state) => ({
          tasks: {
            ...state.tasks,
            [id]: newTask,
          },
        }));
      },
      deleteTask: (id) =>
        set((state) => {
          const updatedTasks = { ...state.tasks };
          delete updatedTasks[id];
          return { tasks: updatedTasks };
        }),
      deleteAllTask: () =>
        set(() => ({
          tasks: {},
        })),
      updateTask: (id, updatedData) =>
        set((state) => ({
          tasks: {
            ...state.tasks,
            [id]: {
              ...state.tasks[id],
              ...updatedData,
            },
          },
        })),
      sortTasks: (sortBy) =>
        set((state) => {
          const sortedTasks = Object.values(state.tasks).sort((a, b) => {
            switch (sortBy) {
              case "name":
                return a.name.localeCompare(b.name);
              case "date":
                return (a.createdAt ?? 0) - (b.createdAt ?? 0);
              case "priority":
                return a.priority.localeCompare(b.priority);
              case "duration":
                return Number(a.time) - Number(b.time);
              default:
                return 0;
            }
          });
          const sortedTasksObject: Record<number, Task> = {};
          sortedTasks.forEach((task) => {
            sortedTasksObject[task.id] = task;
          });
          return { tasks: sortedTasksObject };
        }),
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTaskStore;

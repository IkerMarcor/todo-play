import { Task } from "@/types/taskTypes";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TaskStore {
  tasks: Record<number, Task>;
  createTask: (
    name: string,
    description: string,
    priority: string,
    time: string
  ) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, updatedData: Partial<Omit<Task, "id">>) => void;
}

const useTaskStore = create<TaskStore>()(
  //local storage middleware from zustand
  persist(
    (set) => ({
      tasks: {},
      createTask: (name, description, priority, time) => {
        const id = Date.now();
        const newTask: Task = {
          id,
          name,
          description,
          priority,
          time,
          remainTime: time,
          status: "notStarted",
        };
        set((state) => ({
          tasks: {
            ...state.tasks,
            [id] : newTask,
          }
        }))
      },
      deleteTask: (id) =>
        set((state) => {
          const updatedTasks = {...state.tasks};
          delete updatedTasks[id];
          return {tasks: updatedTasks}
        }),
      updateTask: (id, updatedData) =>
        set((state) => ({
          tasks: {
            ...state.tasks,
            [id]: {
              ...state.tasks[id],
              ...updatedData,
            }
          },
        })),
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTaskStore;

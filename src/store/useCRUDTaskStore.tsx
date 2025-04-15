import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
// import { Priority } from "./constants/priorities";

interface Task {
  id: number;
  name: string;
  description: string;
  priority: string;
  time: string;
  status: string;
}

interface TaskStore {
  tasks: Task[];
  createTask: (
    name: string,
    description: string,
    priority: string,
    time: string,
    status: string
  ) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, updatedData: Partial<Omit<Task, 'id'>>) => void;
}

const useTaskStore = create<TaskStore>()(
  //local storage middleware from zustand
  persist(
    (set) => ({
      tasks: [],
      createTask: (name, description, priority, time, status) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: Date.now(), name, description, priority, time, status },
          ],
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      updateTask: (id, updatedData) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedData } : task
          ),
        })),
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTaskStore;

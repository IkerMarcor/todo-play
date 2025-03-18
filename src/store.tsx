import { create } from "zustand";
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
  // updateTask: (id: number, updates: Partial<Omit<Task, 'id'>>) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
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

  // updateTask: (id, updates) => set((state) => ({
  //   tasks: state.tasks.map(task =>
  //     task.id === id ? { ...task, ...updates } : task
  //   )
  // }))
}));

export default useTaskStore;

import { create } from "zustand";
import { Task } from "@/types/taskTypes";
import useTaskStore from "@/store/useTaskStore";

type SelectedTaskStore = {
  selectedTaskId: number | null;
  setSelectedTaskId: (id: number | null) => void;
  getSelectedTask: () => Task | undefined;
};

const useSelectedTaskStore = create<SelectedTaskStore>((set, get) => ({
  selectedTaskId: null,
  setSelectedTaskId: (id) => set({ selectedTaskId: id }),
  getSelectedTask: () => {
    const id = get().selectedTaskId;
    const tasks = useTaskStore.getState().tasks;
    return tasks.find((task: Task) => task.id === id);
  },
}));

export default useSelectedTaskStore;

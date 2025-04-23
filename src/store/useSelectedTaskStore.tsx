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
    if (id === null) return undefined;
    return tasks[id];
  },
}));

export default useSelectedTaskStore;

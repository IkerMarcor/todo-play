import { create } from "zustand";

type SelectedTaskStore = {
  selectedTaskId: number | null;
  setSelectedTaskId: (id: number | null) => void;
};

const useSelectedTaskStore = create<SelectedTaskStore>((set) => ({
  selectedTaskId: null,
  setSelectedTaskId: (id) => set({ selectedTaskId: id }),
}));

export default useSelectedTaskStore;
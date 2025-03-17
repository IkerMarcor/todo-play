import { create } from 'zustand'

interface StoreState {
  name: string;
  priority: string;
  time: string;
  description: string;
  setName: (name: string) => void;
  setPriority: (priority: string) => void;
  setTime: (time: string) => void;
  setDescription: (description: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  name: "",
  priority: "",
  time: "",
  description: "",
  setName: (newName) => set({ name: newName }),
  setPriority: (newPriority) => set({ priority:  newPriority}),
  setTime: (newTime) => set({ time: newTime }),
  setDescription: (newDescription) => set({ description: newDescription }),
}));

export default useStore;
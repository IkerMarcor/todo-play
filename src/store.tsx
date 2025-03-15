import { create } from 'zustand'

interface StoreState {
  tasks: number
  increasePopulation: () => void
  removeAllTasks: () => void
  updateTasks: (newTasks: number) => void
}

export const useStore = create<StoreState>((set) => ({
  tasks: 0,
  increasePopulation: () => set((state) => ({ tasks: state.tasks + 1 })),
  removeAllTasks: () => set({ tasks: 0 }),
  updateTasks: (newTasks) => set({ tasks: newTasks }),
}))

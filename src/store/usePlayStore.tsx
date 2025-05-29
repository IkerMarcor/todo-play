import { create } from "zustand";
import useTaskStore from "./useTaskStore";
import useSelectedTaskStore from "./useSelectedTaskStore";
import { useTimerStore } from "./useTimerStore";
import { toast } from "sonner";
import { Task } from "@/types/Task";

interface PlayStore {
  currentTaskIndex: number;
  filteredTasks: Task[];
  isPlayComplete: boolean;
  isPlaying: boolean;
  initPlay: () => void;
  play: () => void;
  nextTask: () => void;
  completePlay: () => void;
  stopPlay: () => void;
}

export const usePlayStore = create<PlayStore>((set, get) => ({
  currentTaskIndex: 0,
  filteredTasks: [],
  isPlayComplete: false,
  isPlaying: false,

  initPlay: () => {
    const filteredTasks = useTaskStore.getState().filterTasks("pending");

    if (!filteredTasks) {
      set({
        currentTaskIndex: 0,
        isPlayComplete: true,
        isPlaying: false,
        filteredTasks: [],
      });
      toast.warning("Play not available");
      return;
    }

    if (Object.values(filteredTasks).length < 2) {
      set({
        currentTaskIndex: 0,
        isPlayComplete: true,
        isPlaying: false,
        filteredTasks: [],
      });
      toast.warning("Not enough tasks", {description: "Need more tasks to start playing"});
      return;
    }

    set({
      isPlaying: true,
      filteredTasks: Object.values(filteredTasks),
    });
    usePlayStore.getState().play();
  },
  play: () => {
    const setSelectedTaskId = useSelectedTaskStore.getState().setSelectedTaskId;

    const { currentTaskIndex } = get();
    const { filteredTasks } = get();
    const currentTask = filteredTasks[currentTaskIndex];

    if (!currentTask) {
      set({
        currentTaskIndex: 0,
        isPlayComplete: true,
        isPlaying: false,
        filteredTasks: [],
      });
      toast.success("Play completed");
      setSelectedTaskId(null);
      return;
    }

    setSelectedTaskId(currentTask.id);
    useTaskStore
      .getState()
      .updateTask(currentTask.id, { status: "inProgressPlay" });
    useTimerStore
      .getState()
      .startReset(currentTask.time, currentTask.remainTime);
  },

  nextTask: () => {
    set({ currentTaskIndex: usePlayStore.getState().currentTaskIndex + 1 });
    usePlayStore.getState().play();
  },
  completePlay: () => {
    set({
      currentTaskIndex: 0,
      isPlayComplete: true,
      isPlaying: false,
      filteredTasks: [],
    });
    toast.success("Play completed");
  },

  stopPlay: () => set({ isPlaying: false, filteredTasks: [] }),
}));

export default usePlayStore;

import { create } from "zustand";
import useTaskStore from "./useTaskStore";
import useSelectedTaskStore from "./useSelectedTaskStore";
import { useTimerStore } from "./useTimerStore";
import { toast } from "sonner";

interface PlayStore {
  currentTaskIndex: number;
  isPlayComplete: boolean;
  isPlaying: boolean;
  startPlay: () => void;
  nextTask: () => void;
  completePlay: () => void;
  stopPlay: () => void;
}

export const usePlayStore = create<PlayStore>((set, get) => ({
  currentTaskIndex: 0,
  isPlayComplete: false,
  isPlaying: false,

  startPlay: () => {
    const filteredTasks = useTaskStore.getState().filterTasks("pending");
    const setSelectedTaskId = useSelectedTaskStore.getState().setSelectedTaskId;

    if(filteredTasks === 1) {
      set({ currentTaskIndex: 0, isPlayComplete: true, isPlaying: false });
      toast.warning("Play not available");
      setSelectedTaskId(null);
      return;
    };
    set({ isPlaying: true });
    const { currentTaskIndex } = get();
    const tasks = useTaskStore.getState().tasks;
    const tasksList = Object.values(tasks);
    const currentTask = tasksList[currentTaskIndex];

    if (!currentTask) {
      set({ currentTaskIndex: 0, isPlayComplete: true, isPlaying: false });
      toast.success("Play completed");
      setSelectedTaskId(null);
      return;
    }

    useSelectedTaskStore.getState().setSelectedTaskId(currentTask.id);
    useTaskStore
      .getState()
      .updateTask(currentTask.id, { status: "inProgressPlay" });
    useTimerStore
      .getState()
      .startReset(currentTask.time, currentTask.remainTime);
  },

  nextTask: () => {
    toast.info(<>Your task has been completed completed!</>, {
      description: "Move on to the next task and keep playing",
    });
    set({ currentTaskIndex: usePlayStore.getState().currentTaskIndex + 1 });
    usePlayStore.getState().startPlay();
  },
  completePlay: () => {
    set({ currentTaskIndex: 0, isPlayComplete: true, isPlaying: false });
    toast.success("Play completed");
  },

  stopPlay: () => set({ isPlaying: false }),
}));

export default usePlayStore;

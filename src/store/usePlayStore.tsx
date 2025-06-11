import { create } from "zustand";
import useTaskStore from "./useTaskStore";
import useSelectedTaskStore from "./useSelectedTaskStore";
import { useTimerStore } from "./useTimerStore";
import { Task } from "@/types/Task";
import { useNotificationToast } from "@/hooks/useNotificationSound";

interface PlayStore {
  currentTaskIndex: number;
  filteredTasks: Task[];
  isPlayComplete: boolean;
  isPlaying: boolean;
  initPlay: () => void;
  play: () => void;
  nextTask: (option: string) => void;
  completePlay: () => void;
  stopPlay: () => void;
}

const notify = useNotificationToast();

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
      notify("warning", "Play not available");
      return;
    }

    if (Object.values(filteredTasks).length < 2) {
      set({
        currentTaskIndex: 0,
        isPlayComplete: true,
        isPlaying: false,
        filteredTasks: [],
      });
      notify("warning", "Not enough tasks", {
        description: "Need more tasks to start playing",
      });
      return;
    } else {
      notify("info", "Play started");
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
      notify("success", "Play completed");
      setSelectedTaskId(null);
      return;
    }

    setSelectedTaskId(currentTask.id);
    useTaskStore
      .getState()
      .updateTask(currentTask.id, { status: "inProgressPlay" });
    useTimerStore.getState().resume(currentTask.id);
  },

  nextTask: (option) => {
    const { currentTaskIndex } = get();
    const { filteredTasks } = get();
    const currentTask = filteredTasks[currentTaskIndex];
    if (option === "skipped") {
      notify("info", "Your task has been sent to pending", {
        description: "You can always go back to it.",
      });
    } else if (option === "completed") {
      notify("success", "Good job", {
        description: "Move on to your next task and complete play.",
      });
    }

    set({ currentTaskIndex: currentTaskIndex + 1 });
    useTimerStore.getState().reset(currentTask.id);
    usePlayStore.getState().play();
  },
  completePlay: () => {
    set({
      currentTaskIndex: 0,
      isPlayComplete: true,
      isPlaying: false,
      filteredTasks: [],
    });
    notify("success", "Play completed");
  },

  stopPlay: () => set({ isPlaying: false, filteredTasks: [] }),
}));

export default usePlayStore;

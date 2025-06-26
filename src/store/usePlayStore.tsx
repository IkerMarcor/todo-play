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
  stopPlay: (message: string) => void;
  resetPlay: () => void;
  currentTask: () => Task | undefined;
}

const notify = useNotificationToast();
const filteredTasks = useTaskStore.getState().filterTasks;
const setSelectedTaskId = useSelectedTaskStore.getState().setSelectedTaskId;
const updateTaskStatus = useTaskStore.getState().updateTask;
const startResetTimer = useTimerStore.getState().startReset;
const resetTimer = useTimerStore.getState().reset;

export const usePlayStore = create<PlayStore>((set, get) => ({
  currentTaskIndex: 0,
  filteredTasks: [],
  isPlayComplete: false,
  isPlaying: false,

  initPlay: () => {
    let filtered = filteredTasks("pending");

    if (!filtered) {
      get().stopPlay("No tasks found");
      return;
    }

    if (Object.values(filtered).length < 2) {
      get().stopPlay("You need at least 2 tasks to start play");
    } else {
      get().resetPlay();
      set({
        isPlaying: true,
        filteredTasks: Object.values(filtered),
      });

      notify("info", "Play started");

      get().play();
    }
  },

  play: () => {
    let currentTask = get().currentTask();

    if (!currentTask) {
      get().completePlay();
      setSelectedTaskId(null);
      return;
    }

    if (currentTask.status.includes("break")) {
      notify("info", `Time to take a break`, {
        duration: 4000,
      });
    } else {
      notify("info", `Now playing: ${currentTask.name}`, {
        description: "Focus on your task and complete it.",
        duration: 4000,
      });
    }

    updateTaskStatus(currentTask.id, { status: "inProgressPlay" });
    startResetTimer(currentTask.id);
    setSelectedTaskId(currentTask.id);
  },

  nextTask: (option) => {
    let currentTask = get().currentTask();

    if (!currentTask) {
      get().stopPlay("No current task found");
      return;
    }

    if (option === "skipped") {
      notify("info", "Your task has been sent to pending", {
        description: "You can always go back to it.",
        duration: 4000,
      });
    } else if (option === "completed") {
      notify("success", "Good job", {
        description: "Move on to your next task and complete play.",
        duration: 4000,
      });
    }

    set({ currentTaskIndex: get().currentTaskIndex + 1 });
    resetTimer(currentTask.id); // This resets the timer for the current task if its skipped or completed.
    get().play();
  },

  completePlay: () => {
    get().resetPlay();
    notify("success", "Play completed");
    setSelectedTaskId(null);
  },

  stopPlay: (message) => {
    get().resetPlay();
    notify("warning", "Play stopped", {
      description: message,
      duration: 4000,
    });
    setSelectedTaskId(null);
  },

  resetPlay: () =>
    set(() => ({
      currentTaskIndex: 0,
      filteredTasks: [],
      isPlayComplete: false,
      isPlaying: false,
    })),

  currentTask: () => get().filteredTasks[get().currentTaskIndex] || undefined,
}));

export default usePlayStore;

import { Task } from "@/types/Task";
import { create } from "zustand";
import { useTimerStore } from "./useTimerStore";
import { toast } from "sonner";
import { convertTimeInSeconds } from "@/middleware";
import useTaskStore from "./useTaskStore";

interface BreakStore {
  createBreak: () => void;
}

const createNewTimer = useTimerStore.getState().createTimer;

const useBreakStore = create<BreakStore>()(() => ({
  createBreak: () => {
    const TaskList = Object.values(useTaskStore.getState().tasks);
    const TaskListLength = TaskList.length;

    if (TaskListLength <= 0) {
      toast.warning("Please add a task before adding a break.");
      return;
    }

    const id = Date.now();
    const time = convertTimeInSeconds("0.25"); // default break time of 15 minutes
    const newBreak: Task = {
      id,
      name: "Break",
      description: "Take a break",
      priority: "N",
      state: "notStarted",
      time: time,
      createdAt: id,
      type: "break", // type for breaks
      locked: true, // breaks are locked by default
    };

    if (TaskListLength > 0) {
      const prevItem = TaskList[TaskListLength - 1];

      if (prevItem.type === "break") {
        toast.warning("You cannot add a break next to each other");
        return;
      }
    }

    createNewTimer(id, time);

    // Append the new break in the task list
    useTaskStore.getState().appendTask(newBreak);
  },
}));

export default useBreakStore;

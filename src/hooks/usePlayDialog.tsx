import usePlayStore from "@/store/usePlayStore";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import { useTimerStore } from "@/store/useTimerStore";
import { useEffect, useState } from "react";

export default function usePlayDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [breakDialogOpen, setBreakDialogOpen] = useState(false);
  const [finalDialogOpen, setFinalDialogOpen] = useState(false);

  const isPlaying = usePlayStore((e) => e.isPlaying);
  const currentTaskIndex = usePlayStore((e) => e.currentTaskIndex);
  const tasks = useTaskStore((s) => s.tasks);
  const tasksLength = Object.values(tasks).length - 1;
  const isCompleted = useTimerStore((s) => s.isCompleted);
  const currentTask = useSelectedTaskStore((s) => s.getSelectedTask());

  useEffect(() => {
    if (isCompleted && isPlaying) {
      if (currentTask && currentTask.type === "break") {
        setBreakDialogOpen(true);
        return;
      } else if (tasksLength === currentTaskIndex) {
        setFinalDialogOpen(true);
        return;
      } else {
        setDialogOpen(true);
        return;
      }
    }
  }, [isPlaying, isCompleted, currentTaskIndex, tasksLength]);

  const resetDialogState = () => {
    setDialogOpen(false);
    setBreakDialogOpen(false);
    setFinalDialogOpen(false);
  };

  return {
    dialogOpen,
    finalDialogOpen,
    breakDialogOpen,
    setDialogOpen,
    setFinalDialogOpen,
    setBreakDialogOpen,
    resetDialogState,
  };
}

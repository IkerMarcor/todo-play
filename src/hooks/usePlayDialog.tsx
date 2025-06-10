import usePlayStore from "@/store/usePlayStore";
import useTaskStore from "@/store/useTaskStore";
import { useTimerStore } from "@/store/useTimerStore";
import { useEffect, useState } from "react";

export default function usePlayDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [finalDialogOpen, setFinalDialogOpen] = useState(false);
  
  const isPlaying = usePlayStore((e) => e.isPlaying);
  const currentTaskIndex = usePlayStore((e) => e.currentTaskIndex);
  const tasks = useTaskStore((s) => s.tasks);
  const tasksLength = Object.values(tasks).length - 1;

  const currentTaskId = tasks[currentTaskIndex]?.id;
  const currentTimer = useTimerStore((s) => currentTaskId !== undefined ? s.timers[currentTaskId] : undefined);
  const isCompleted = currentTimer?.isCompleted;


  useEffect(() => {
    if (tasksLength === currentTaskIndex && isCompleted) {
      setFinalDialogOpen(true);
      return;
    }
    if (isCompleted && isPlaying ) {
      setDialogOpen(true);
      return;
    }
  }, [isPlaying, isCompleted, currentTaskIndex, tasksLength]);

  return {
    dialogOpen,
    finalDialogOpen,
    setDialogOpen,
    setFinalDialogOpen
  };
}

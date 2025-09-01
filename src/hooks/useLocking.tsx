import { useEffect } from "react";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import useToggleStore from "@/store/useToggleStore";
import useSortStore from "@/store/useBackupTaskStore";

export default function useLocking() {
  const selectedTaskId = useSelectedTaskStore((s) => s.selectedTaskId);
  const setOpen = useToggleStore((s) => s.setOpen);
  const tasks = useTaskStore((s) => s.visibleTasks);
  const backupTasks = useSortStore((s) => s.backupTasks);
  const playModeToggle = useToggleStore((s) => s.playModeToggle);
  const updateAllTasks = useTaskStore((s) => s.updateAllTasks);

  
  useEffect(() => {

    if (selectedTaskId || playModeToggle) {
      updateAllTasks({ locked: true });
    } else {
      updateAllTasks({ locked: false });
    }
  }, [selectedTaskId, playModeToggle]);

  useEffect(() => {
    const numTasks = Object.values(tasks).reduce(
      (count, task) => count + (task.type !== "break" ? 1 : 0),
      0
    );
    const numBackupTasks = Object.values(backupTasks).reduce(
      (count, task) => count + (task.type !== "break" ? 1 : 0),
      0
    );

    if (numTasks < 2 || selectedTaskId) {
      if (numBackupTasks < 2 || selectedTaskId) {
        setOpen("disableToggle", true);
      } else {
        setOpen("disableToggle", false);
      }
    } else {
      setOpen("disableToggle", false);
    }
  }, [tasks, backupTasks, selectedTaskId]);
}

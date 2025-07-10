import { useEffect } from "react";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import useToggleStore from "@/store/useToggleStore";
import useSortStore from "@/store/useBackupStore";
import useMergeStore from "@/store/useMergeStore";

export default function useLocking() {
  const selectedTaskId = useSelectedTaskStore((s) => s.selectedTaskId);
  const setOpen = useToggleStore((s) => s.setOpen);
  const tasks = useTaskStore((s) => s.tasks);
  const backupTasks = useSortStore((s) => s.backupTasks);
  const playModeToggle = useToggleStore((s) => s.playModeToggle);

  
  useEffect(() => {
    // Changes the state of all tasks inside the store
    const toggleLocked = Object.fromEntries(
      Object.entries(tasks).map(([id, task]) => [id, { ...task, locked: !task.locked }])
    );

    if (selectedTaskId || playModeToggle) {
      useTaskStore.setState({ tasks: toggleLocked });
    } else {
      useTaskStore.setState({ tasks: toggleLocked });
    }
  }, [selectedTaskId, playModeToggle]);

  useEffect(() => {
    //console.log(useMergeStore.getState().mergedActivities)
    // Updates the UI and makes the buttons disabled or enabled based on the number of tasks
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

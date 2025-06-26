import { useEffect } from "react";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import useToggleStore from "@/store/useToggleStore";
import useSortStore from "@/store/useBackupStore";

export default function useLocking() {
  const selectedTaskId = useSelectedTaskStore((s) => s.selectedTaskId);
  const setOpen = useToggleStore((s) => s.setOpen);
  const tasks = useTaskStore((s) => s.tasks);
  const backupTasks = useSortStore((s) => s.backupTasks);
  const playModeToggle = useToggleStore((s) => s.playModeToggle);

  // Disable other tasks based on the selected task
  useEffect(() => {
    const updatedTasks = (status: string) => {
      return Object.fromEntries(
        status === "Locked"
          ? Object.entries(tasks).map(([id, task]) => [
              id,
              task.status === "completed" ||
              task.status === "inProgress" ||
              task.status === "inProgressPlay"
                ? task
                : { ...task, status: task.status.includes("Locked") ? task.status : task.status + status },
            ])
          : Object.entries(tasks).map(([id, task]) => [
              id,
              { ...task, status: task.status.replace("Locked", "") },
            ])
      );
    };

    if (selectedTaskId || playModeToggle) {
      useTaskStore.setState({ tasks: updatedTasks("Locked") });
    } else {
      useTaskStore.setState({ tasks: updatedTasks("notLocked") });
    }
  }, [selectedTaskId, playModeToggle]);

  useEffect(() => {
    const numTasks = Object.values(tasks).reduce(
      (count, task) => count + (!task.status.includes("break") ? 1 : 0),
      0
    );
    const numBackupTasks = Object.values(backupTasks).reduce(
      (count, task) => count + (!task.status.includes("break") ? 1 : 0),
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

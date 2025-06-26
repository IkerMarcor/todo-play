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
        Object.entries(tasks).map(([id, task]) => [
          id,
          task.status === "notStartedLocked"
            ? { ...task, status: "notStarted" }
            : task.status === "notStarted" && selectedTaskId
            ? { ...task, status: "notStartedLocked" }
            : task.status === "completed" ||
              task.status === "inProgress" ||
              task.status === "notStarted" ||
              task.status === "inProgressPlay"
            ? task
            : { ...task, status: status },
        ])
      );
    };

    if (selectedTaskId || playModeToggle) {
      useTaskStore.setState({ tasks: updatedTasks("locked") });
    } else {
      useTaskStore.setState({ tasks: updatedTasks("onPause") });
    }
  }, [selectedTaskId, playModeToggle]);

  useEffect(() => {
    const numTasks = Object.values(tasks).reduce(
      (count, task) => count + (task.status !== "break" ? 1 : 0),
      0
    );
    const numBackupTasks = Object.values(backupTasks).reduce(
      (count, task) => count + (task.status !== "break" ? 1 : 0),
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

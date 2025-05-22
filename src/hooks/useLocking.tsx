import { useEffect } from "react";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import useToggleStore from "@/store/useToggleStore";
import useSortStore from "@/store/useSortStore";

export default function useLocking() {
  const selectedTaskId = useSelectedTaskStore((s) => s.selectedTaskId);
  const setOpen = useToggleStore((s) => s.setOpen);
  const tasks = useTaskStore((s) => s.tasks);
  const backupTasks = useSortStore((s) => s.backupTasks);

  // Disable other tasks based on the selected task
  useEffect(() => {
    const updatedTasks = (status: string) => {
      return Object.fromEntries(
        Object.entries(tasks).map(([id, task]) => [
          id,
          task.status === "notStartedLocked" // TODO: toggle between notStarted and notStartedLocked
            ? { ...task, status: "notStarted" }
            : task.status === "notStarted" && selectedTaskId
            ? { ...task, status: "notStartedLocked" }
            : task.status === "completed" ||
              task.status === "inProgress" ||
              task.status === "notStarted"
            ? task
            : { ...task, status: status },
        ])
      );
    };

    if (selectedTaskId) {
      useTaskStore.setState({ tasks: updatedTasks("locked") });
    } else {
      useTaskStore.setState({ tasks: updatedTasks("onPause") });
    }
  }, [selectedTaskId]);

  useEffect(() => {
    if (Object.keys(tasks).length < 2 || selectedTaskId) {
      if (Object.keys(backupTasks).length < 2 || selectedTaskId) {
        setOpen("disableToggle", true);
      } else {
        setOpen("disableToggle", false);
      }
    } else {
      setOpen("disableToggle", false);
    }
  }, [tasks, backupTasks, selectedTaskId]);
}

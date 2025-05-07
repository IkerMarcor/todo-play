import { useEffect } from "react";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import useToggleStore from "@/store/useToggleStore";

export default function useTaskLocking() {
  const selectedTaskId = useSelectedTaskStore((s) => s.selectedTaskId);
  const setOpen = useToggleStore((s) => s.setOpen)
  const { tasks } = useTaskStore();

  useEffect(() => {
    const updatedTasks = (status: string) => {
      return Object.fromEntries(
        Object.entries(tasks).map(([id, task]) => [
          id,
          task.status === "notStartedLocked"
            ? { ...task, status: "notStarted" }
            : task.status === "completed" || task.status === "inProgress"
            ? task
            : { ...task, status: status },
        ])
      );
    };

    if (selectedTaskId) {
      useTaskStore.setState({ tasks: updatedTasks("locked") });
      setOpen("disableToggle", true);
    } else {
      useTaskStore.setState({ tasks: updatedTasks("onPause") });
      setOpen("disableToggle", false);
    }
  }, [selectedTaskId]);
}

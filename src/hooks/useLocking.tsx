import { useEffect } from "react";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import useToggleStore from "@/store/useToggleStore";

export default function useLocking() {
  const selectedTaskId = useSelectedTaskStore((s) => s.selectedTaskId);
  const setOpen = useToggleStore((s) => s.setOpen);
  const tasks = useTaskStore((s) => s.tasks);
  
  // Disable other tasks based on the selected task
  useEffect(() => {
    const updatedTasks = (status: string) => {
      return Object.fromEntries(
        Object.entries(tasks).map(([id, task]) => [
          id,
          task.status === "notStartedLocked" // TODO: toggle between notStarted and notStartedLocked
            ? { ...task, status: "notStarted" }
            : task.status === "notStarted"
            ? { ...task, status: "notStartedLocked" }
            : task.status === "completed" || task.status === "inProgress"
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

  // Disable buttons if there are less than 2 tasks or a task is selected
  useEffect(() => {
    if (Object.keys(tasks).length < 2 || selectedTaskId) {
      setOpen("disableToggle", true);
    } else {
      setOpen("disableToggle", false);
    }
  }, [tasks, selectedTaskId]);
}

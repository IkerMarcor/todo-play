import { useEffect } from "react";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";

export default function useTaskLocking() {
  const selectedTaskId = useSelectedTaskStore((s) => s.selectedTaskId);
  const {tasks} = useTaskStore();

  useEffect(() => {
    const updatedTasks = (locked: boolean) => {
      return Object.fromEntries(
        Object.entries(tasks).map(([id, task]) => [
          id,
          task.status === "completed" ? task : { ...task, isLocked: locked },
        ])
      );
    };

    if (selectedTaskId) {
      useTaskStore.setState({ tasks: updatedTasks(true) });
    } else {
      useTaskStore.setState({ tasks: updatedTasks(false) });
    }
  }, [selectedTaskId]);
}

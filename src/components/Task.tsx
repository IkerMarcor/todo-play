import TaskInProgress from "./TaskInProgress";
import TaskCompleted from "./TaskCompleted";
import TaskNotStarted from "./TaskNotStarted";
import TaskOnPause from "./TaskOnPause";
import { getTaskById } from "@/middleware";
import { useTimerStore } from "@/store/useTimerStore";
import { useEffect } from "react";

export default function Task({ id }: { id: number }) {
  const task = getTaskById(id);
  // const { seconds, isRunning } = useTimerStore();

  //   useEffect(() => {
  //   if (!task) return;
  //   let interval: NodeJS.Timeout | undefined;

  //   if (isRunning && seconds > 0) {
  //     console.log("Render");
  //   } else {
  //     console.log("Render2");
  //     // clearInterval(interval);
  //     // updateTask(task.id, { timeLeft: seconds.toFixed(2) });
  //   }

  //   return () => clearInterval(interval);
  // }, [isRunning]);
  
  
  const renderTask = () => {
    switch (task?.status) {
      case "inProgress":
        return <TaskInProgress id={id} />;
      case "completed":
        return <TaskCompleted id={id} />;
      case "notStarted":
        return <TaskNotStarted id={id} />;
      case "onPause":
        return <TaskOnPause id={id} />;
      default:
        return <p>Unknown status</p>;
    }
  };

  return <>{renderTask()}</>;
}

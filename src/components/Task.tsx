import TaskInProgress from "./TaskInProgress";
import TaskCompleted from "./TaskCompleted";
import TaskNotStarted from "./TaskNotStarted";
import TaskOnPause from "./TaskOnPause";
import { getTaskById } from "@/middleware";

export default function Task({ id }: { id: number }) {
  const taskSelected = getTaskById(id);
  if (!taskSelected) return <li>Task not found</li>;

  const renderTask = () => {
    switch (taskSelected.status) {
      case "inProgress":
        return (
          <TaskInProgress
            id={taskSelected.id}
            name={taskSelected.name}
            priority={taskSelected.priority}
            description={taskSelected.description}
          />
        );
      case "completed":
        return <TaskCompleted name={taskSelected.name} />;
      case "notStarted":
        return (
          <TaskNotStarted
            id={taskSelected.id}
            name={taskSelected.name}
            time={taskSelected.time}
          />
        );
      case "onPause":
        return (
          <TaskOnPause
            id={taskSelected.id}
            name={taskSelected.name}
            priority={taskSelected.priority}
            description={taskSelected.description}
            time={taskSelected.time}
            remainTime={taskSelected.remainTime}
          />
        );
      default:
        return <p>Unknown status: {taskSelected.status}</p>;
    }
  };

  return <>{renderTask()}</>;
}

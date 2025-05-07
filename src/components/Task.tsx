import TaskInProgress from "./TaskInProgress";
import TaskCompleted from "./TaskCompleted";
import TaskNotStarted from "./TaskNotStarted";
import TaskNotStartedLocked from "./TaskNotStartedLocked";
import TaskOnPause from "./TaskOnPause";
import TaskLocked from "./TaskLocked";
import { getTaskById } from "@/middleware";

interface TaskProps {
  id: number;
  index: number;
}

export default function Task(props: TaskProps) {
  const taskSelected = getTaskById(props.id);
  if (!taskSelected) return <li>Task not found</li>;

  const renderTask = () => {
    switch (taskSelected.status) {
      case "inProgress":
        return (
          <TaskInProgress
            id={taskSelected.id}
            index={props.index}
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
            index={props.index}
            name={taskSelected.name}
            priority={taskSelected.priority}
            description={taskSelected.description}
            time={taskSelected.time}
            remainTime={taskSelected.remainTime}
          />
        );
      case "locked":
        return (
          <TaskLocked
            index={props.index}
            name={taskSelected.name}
            priority={taskSelected.priority}
            description={taskSelected.description}
          />
        );
        case "notStartedLocked":
        return (
          <TaskNotStartedLocked
            name={taskSelected.name}
          />
        );
      default:
        return <p>Unknown status: {taskSelected.status}</p>;
    }
  };

  return <>{renderTask()}</>;
}

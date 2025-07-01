import TaskInProgress from "./TaskInProgress";
import TaskInProgressPlay from "./TaskInProgressPlay";
import TaskCompleted from "./TaskCompleted";
import TaskNotStarted from "./TaskNotStarted";
import TaskOnPause from "./TaskOnPause";
import { getTaskById } from "@/middleware";
import useToggleStore from "@/store/useToggleStore";

interface TaskProps {
  id: number;
  index: number;
}

export default function Task(props: TaskProps) {
  const taskSelected = getTaskById(props.id);
  const playModeToggle = useToggleStore((s) => s.playModeToggle);
  if (!taskSelected) return <li>Task not found</li>;

  const renderTask = () => {
    if (playModeToggle) {
      switch (taskSelected.state) {
        case "inProgress":
          return (
            <TaskInProgressPlay
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
              locked={taskSelected.locked}
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
              locked={taskSelected.locked}
            />
          );
        default:
          return <p>Unknown state: {taskSelected.state}</p>;
      }
    } else {
      switch (taskSelected.state) {
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
              locked={taskSelected.locked}
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
              locked={taskSelected.locked}
            />
          );
        default:
          return <p>Unknown state: {taskSelected.state}</p>;
      }
    }
  };

  return <>{renderTask()}</>;
}

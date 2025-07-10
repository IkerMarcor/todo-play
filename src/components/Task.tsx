import TaskInProgress from "./TaskInProgress";
import TaskInProgressPlay from "./TaskInProgressPlay";
import TaskCompleted from "./TaskCompleted";
import TaskNotStarted from "./TaskNotStarted";
import TaskOnPause from "./TaskOnPause";
import useToggleStore from "@/store/useToggleStore";

interface TaskProps {
  id: number;
  index: number;
  state: string;
  name: string;
  priority: string;
  description: string;
  type: string;
  locked: boolean;
}

export default function Task(props: TaskProps) {
  const playModeToggle = useToggleStore((s) => s.playModeToggle);

  const renderTask = () => {
    if (playModeToggle) {
      switch (props.state) {
        case "inProgress":
          return (
            <TaskInProgressPlay
              id={props.id}
              index={props.index}
              name={props.name}
              priority={props.priority}
              description={props.description}
              type={props.type }
            />
          );
        case "completed":
          return <TaskCompleted name={props.name} />;
        case "notStarted":
          return (
            <TaskNotStarted
              id={props.id}
              name={props.name}
              locked={props.locked}
              type={props.type}
            />
          );
        case "onPause":
          return (
            <TaskOnPause
              id={props.id}
              index={props.index}
              name={props.name}
              priority={props.priority}
              description={props.description}
              locked={props.locked}
              type={props.type}
            />
          );
        default:
          return <p>Unknown state: {props.state}</p>;
      }
    } else {
      switch (props.state) {
        case "inProgress":
          return (
            <TaskInProgress
              id={props.id}
              index={props.index}
              name={props.name}
              priority={props.priority}
              description={props.description}
              type={props.type}
            />
          );
        case "completed":
          return <TaskCompleted name={props.name} />;
        case "notStarted":
          return (
            <TaskNotStarted
              id={props.id}
              name={props.name}
              locked={props.locked}
              type={props.type}
            />
          );
        case "onPause":
          return (
            <TaskOnPause
              id={props.id}
              index={props.index}
              name={props.name}
              priority={props.priority}
              description={props.description}
              locked={props.locked}
              type={props.type}
            />
          );
        default:
          return <p>Unknown state: {props.state}</p>;
      }
    }
  };

  return <>{renderTask()}</>;
}

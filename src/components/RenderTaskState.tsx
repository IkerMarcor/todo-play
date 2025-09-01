import TaskInProgress from "./TaskInProgress";
import TaskCompleted from "./TaskCompleted";
import TaskNotStarted from "./TaskNotStarted";
import TaskOnPause from "./TaskOnPause";

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

export default function RenderTaskState(props: TaskProps) {
  const renderTask = () => {
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
  };

  return <>{renderTask()}</>;
}

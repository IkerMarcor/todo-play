import { useMemo } from "react";
import RenderTaskState from "@/components/RenderTaskState";
import RenderTaskStatePlay from "@/components/RenderTaskStatePlay";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import UpdateTask from "@/components/UpdateTask";
import useLocking from "@/hooks/useLocking";
import PlayDialog from "./PlayDialog";
import FinalPlayDialog from "./FinalPlayDialog";
import useAlarm from "@/hooks/useAlarm";
import useToggleStore from "@/store/useToggleStore";
import BreakDialog from "./BreakDialog";
import { Task as TaskType } from "@/types/Task";

export default function TaskList() {
  useAlarm();
  useLocking();
  const { selectedTaskId } = useSelectedTaskStore();
  const tasks = useTaskStore((state) => state.visibleTasks);
  const playModeToggle = useToggleStore((state) => state.playModeToggle);
  const tasksLength = tasks.length;

  // Memoize the filtered list to prevent unnecessary recalculations
  const filteredList = useMemo(() => {
    return playModeToggle
      ? tasks
      : tasks.filter((task: TaskType) => task.type !== "break");
  }, [tasks, playModeToggle]);

  return (
    <>
      {tasksLength === 0 ? (
        <h1 className="align-middle">Add Tasks to start Play!</h1>
      ) : (
        <ul className="sm:grid sm:grid-cols-2 xl:grid xl:grid-cols-3">
          {filteredList.map((task: TaskType, index: number) => (
            <li key={task.id} className="m-2 drop-shadow-sm">
              {playModeToggle ? <RenderTaskStatePlay
                id={task.id}
                index={index + 1}
                state={task.state}
                name={task.name}
                priority={task.priority}
                description={task.description}
                type={task.type}
                locked={task.locked}
              /> : <RenderTaskState
                id={task.id}
                index={index + 1}
                state={task.state}
                name={task.name}
                priority={task.priority}
                description={task.description}
                type={task.type}
                locked={task.locked}
              />}
            </li>
          ))}

          {selectedTaskId !== null && <UpdateTask />}
          <PlayDialog />
          <FinalPlayDialog />
          <BreakDialog />
        </ul>
      )}
    </>
  );
}

import { useMemo } from "react";
import Task from "@/components/Task";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import useBreakStore from "@/store/useBreakStore";
import UpdateTask from "@/components/UpdateTask";
import useLocking from "@/hooks/useLocking";
import PlayDialog from "./PlayDialog";
import FinalPlayDialog from "./FinalPlayDialog";
import useAlarm from "@/hooks/useAlarm";
import useToggleStore from "@/store/useToggleStore";
import BreakDialog from "./BreakDialog";
import useMergeStore from "@/store/useMergeStore";
import { Task as TaskType } from "@/types/Task";

export default function TaskList() {
  useAlarm();
  useLocking();
  const { selectedTaskId } = useSelectedTaskStore();
  const { tasks } = useTaskStore();
  const { breaks } = useBreakStore();
  const getMergedList = useMergeStore((state) => state.getMergedList);
  const playModeToggle = useToggleStore((state) => state.playModeToggle);

  // Memoize the filtered list to prevent unnecessary recalculations
  const displayList = useMemo(() => {
    const mergedList = getMergedList();
    return playModeToggle ? mergedList : mergedList.filter((task: TaskType) => task.type !== "break");
  }, [getMergedList, playModeToggle, tasks, breaks]);

  return (
    <>
      {Object.keys(tasks).length === 0 ? (
        <h1 className="align-middle">Add Tasks to start Play!</h1>
      ) : (
        <ul className="sm:grid sm:grid-cols-2 xl:grid xl:grid-cols-3">
          {displayList.map((task: TaskType, index: number) => (
            <li key={task.id} className="m-2 drop-shadow-sm">
              <Task
                id={task.id}
                index={index + 1}
                state={task.state}
                name={task.name}
                priority={task.priority}
                description={task.description}
                type={task.type}
                locked={task.locked}
              />
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

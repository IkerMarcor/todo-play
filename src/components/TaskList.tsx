import Task from "@/components/Task";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import UpdateTask from "@/components/UpdateTask";
import useLocking from "@/hooks/useLocking";
import PlayDialog from "./PlayDialog";
import FinalPlayDialog from "./FinalPlayDialog";
import useAlarm from "@/hooks/useAlarm";
import useToggleStore from "@/store/useToggleStore";
import BreakDialog from "./BreakDialog";
import useMergeSync from "@/hooks/useMergeSync";
import useMergeStore from "@/store/useMergeStore";

export default function TaskList() {
  useMergeSync();
  useAlarm();
  useLocking();
  const { selectedTaskId } = useSelectedTaskStore();
  const { tasks } = useTaskStore();
  const { mergedList } = useMergeStore();
  const playModeToggle = useToggleStore((state) => state.playModeToggle);

  return (
    <>
      {Object.keys(tasks).length === 0 ? (
        <h1 className="align-middle">Add Tasks to start Play!</h1>
      ) : (
        <ul className="sm:grid sm:grid-cols-2 xl:grid xl:grid-cols-3">
          {playModeToggle
            ? mergedList().map((task, index) => (
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
              ))
            : mergedList()
                .filter((task) => task.type !== "break")
                .map((task, index) => (
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

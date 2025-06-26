import Task from "@/components/Task";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import UpdateTask from "@/components/UpdateTask";
import useLocking from "@/hooks/useLocking";
import PlayDialog from "./PlayDialog";
import FinalPlayDialog from "./FinalPlayDialog";
import useAlarm from "@/hooks/useAlarm";
import useToggleStore from "@/store/useToggleStore";
export default function TaskList() {
  useAlarm();
  useLocking();
  const { selectedTaskId } = useSelectedTaskStore();
  const { tasks } = useTaskStore();
  const playModeToggle = useToggleStore((state) => state.playModeToggle);

  return (
    <>
      {Object.keys(tasks).length === 0 ? (
        <h1 className="align-middle">Add Tasks to start Play!</h1>
      ) : (
        <ul className="sm:grid sm:grid-cols-2 xl:grid xl:grid-cols-3">
          {playModeToggle
            ? Object.keys(tasks).map((id, index) => (
                <li key={id} className="m-2 drop-shadow-sm">
                  <Task id={Number(id)} index={index + 1} />
                </li>
              ))
            : Object.entries(tasks)
                .filter(([_, task]) => task.name !== "Break")
                .map(([id, _], index) => (
                  <li key={id} className="m-2 drop-shadow-sm">
                    <Task id={Number(id)} index={index + 1} />
                  </li>
                ))}

          {selectedTaskId !== null && <UpdateTask />}
          <PlayDialog />
          <FinalPlayDialog />
        </ul>
      )}
    </>
  );
}

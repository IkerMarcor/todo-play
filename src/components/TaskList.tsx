import Task from "@/components/Task";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import UpdateTask from "@/components/UpdateTask";
import useLocking from "@/hooks/useLocking";
import PlayDialog from "./PlayDialog";
import FinalPlayDialog from "./FinalPlayDialog";
import useAlarm from "@/hooks/useAlarm";

export default function TaskList() {
  useLocking();
  useAlarm();
  const { selectedTaskId } = useSelectedTaskStore();
  const { tasks } = useTaskStore();

  return (
    <>
      {Object.keys(tasks).length === 0 ? (
        <h1 className="align-middle">Add Tasks to start Play!</h1>
      ) : (
        <ul className="sm:grid sm:grid-cols-2 xl:grid xl:grid-cols-3">
          {Object.keys(tasks).map((id, index) => (
            <li key={id} className="m-2 drop-shadow-sm">
              <Task id={Number(id)} index={index + 1}></Task>
            </li>
          ))}
          {selectedTaskId !== null && <UpdateTask />}
          <PlayDialog/>
          <FinalPlayDialog/>
        </ul>
      )}
    </>
  );
}

import Task from "@/components/Task";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import UpdateTask from "@/components/UpdateTask";
import DeleteTask from "@/components/DeleteTask";

export default function TaskList() {
  const { selectedTaskId } = useSelectedTaskStore();
  const { tasks } = useTaskStore();

  return (
    <>
      {Object.keys(tasks).length === 0 ? (
        <h1 className="align-middle">You haven't add a Task yet :/</h1>
      ) : (
        <ul className="sm:grid sm:grid-cols-2 xl:grid xl:grid-cols-3">
          {Object.keys(tasks).map((id) => (
            <li key={id} className="m-2 drop-shadow-sm">
              <Task id={Number(id)}></Task>
            </li>
          ))}
          {selectedTaskId !== null && <UpdateTask />}
          {selectedTaskId !== null && <DeleteTask id={selectedTaskId} />}
        </ul>
      )}
    </>
  );
}

import Task from "@/components/Task";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useCRUDTaskStore";
import UpdateTask from "@/components/UpdateTask";
import DeleteTask from "@/components/DeleteTask";

export default function TaskList() {
  const { selectedTaskId } = useSelectedTaskStore();
  const { tasks } = useTaskStore();
  return (
    <>
      {tasks.length === 0 ? (
        <h1 className="align-middle">You haven't add a Task yet :/</h1>
      ) : (
        <ul className="sm:grid sm:grid-cols-2 xl:grid xl:grid-cols-3">
          {tasks.map((task, index) => (
            <li
              key={task.id}
              className="m-2 drop-shadow-sm hover:drop-shadow-xl hover:-translate-y-2 duration-300 ease-in-out"
            >
              <Task
                id={task.id}
                index={index + 1}
                name={task.name}
                description={task.description}
                priority={task.priority}
                status={task.status}
              />
            </li>
          ))}
          {selectedTaskId !== null && <UpdateTask id={selectedTaskId} />}
          {selectedTaskId !== null && <DeleteTask id={selectedTaskId} />}
        </ul>
      )}
    </>
  );
}

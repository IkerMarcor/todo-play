import Task from "@/components/Task";
// import tasks from "@/db/TableTasks";
import useTaskStore from "@/store";

export default function TaskList() {
  const { tasks } = useTaskStore();
  return (
    <>
      {tasks.length === 0 ? (
        <div className="h-80 flex items-center justify-center"><h1 className="align-middle">You haven't add a Task yet :/</h1></div>
      ) : (
        <ul className="lg:grid lg:grid-cols-3">
          {tasks.map((task, index) => (
            <li key={task.id} className="m-2 drop-shadow-md">
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
        </ul>
      )}
    </>
  );
}

import Task from "@/components/Task";
// import tasks from "@/db/TableTasks";
import useTaskStore from "@/store";

export default function TaskList() {
  const { tasks } = useTaskStore();
  return (
    <>
      {tasks.length === 0 ? (
        <h1>You haven't add a Task yet :/</h1>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <Task
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

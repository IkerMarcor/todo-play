import Task from "@/components/Task";
import tasks from "@/db/TableTasks";

export default function TaskList() {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          <Task
            name={task.name}
            title={task.title}
            description={task.description}
            priority={task.priority}
            state={task.state}
          />
        </li>
      ))}
    </ul>
  );
}

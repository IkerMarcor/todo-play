import Task from "@/components/Task";

const tasks = [
  {
    name: "Task 0",
    title: "Lorem",
    description: "loremasdfareuvmaosdkjf aoidnfaksjenf",
    priority: "C",
    state: "Completed",
  },
  {
    name: "Task 1",
    title: "Lorem",
    description: "loremasdfareuvmaosdkjf aoidnfaksjenf",
    priority: "D",
    state: "Completed",
  },
  {
    name: "Task 2",
    title: "Lorem",
    description: "loremasdfareuvmaosdkjf aoidnfaksjenf",
    priority: "C",
    state: "inProgress",
  },
  {
    name: "Task 3",
    title: "Lorem",
    description: "loremasdfareuvmaosdkjf aoidnfaksjenf",
    priority: "C",
    state: "notStarted",
  },
];

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

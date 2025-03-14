import "./App.css";

import Play from "@/components/icons/Play"

import { Button } from "@/components/ui/button";

import TaskCompleted from "@/components/TaskCompleted";
import TaskInProgress from "@/components/TaskInProgress";
import TaskNotStarted from "@/components/TaskNotStarted";
import AddTaskButton from "./components/AddTaskButton";

function App() {
  return (
    <>
      <ul>
        <li>
          <TaskCompleted
            name={"Task 0"}
            title={"Lorem"}
            description={"lasdjflakwefpiacn"}
          />
        </li>
        <li>
          <TaskInProgress
            name={"Task 1"}
            title={"Lorem"}
            description={"lasdjflakwefpiacn"}
          />
        </li>
        <li>
          <TaskNotStarted name={"Task 2"} />
        </li>
        <li>
          <TaskNotStarted name={"Task 3"} />
        </li>
      </ul>

      <div className="flex justify-center gap-4 my-4">
        <Button>Filter</Button>
        <Button>
          <Play/>
        </Button>
        <AddTaskButton/>
      </div>
    </>
  );
}

export default App;

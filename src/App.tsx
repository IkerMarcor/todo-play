import "./App.css";

import Play from "@/components/icons/Play";

import { Button } from "@/components/ui/button";

import Task from "@/components/Task";
import AddTask from "./components/AddTask";

function App() {
  return (
    <>
      <ul>
        <li>
          <Task
            name={"Task 0"}
            title={"Lorem"}
            description={"uritosrutn"}
            priority={"C"}
            state={"Completed"}
          />
        </li>
        <li>
          <Task
            name={"Task 1"}
            title={"Lorem"}
            description={"lasdjflakwefpiacn"}
            priority={"B"}
            state={"inProgress"}
          />
        </li>
        <li>
          <Task
            name={"Task 1"}
            title={"Lorem"}
            description={"lasdjflakwefpiacn"}
            priority={"B"}
            state={"notStarted"}
          />
        </li>
        <li>
          <Task
            name={"Task 1"}
            title={"Lorem"}
            description={"lasdjflakwefpiacn"}
            priority={"B"}
            state={"notStarted"}
          />
        </li>
      </ul>

      <div className="flex justify-center gap-4 my-4">
        <Button>Filter</Button>
        <Button>
          <Play />
        </Button>
        <AddTask />
      </div>
    </>
  );
}

export default App;

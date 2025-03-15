import "./App.css";

import Play from "@/components/icons/Play";

import { Button } from "@/components/ui/button";

import AddTask from "@/components/AddTask";
import TaskList from "@/components/TaskList"

import { useStore } from "./store"; // Assuming the store is in a file named store.ts

function App() {
  // const { tasks, increasePopulation, removeAllTasks, updateTasks } = useStore();

  return (
    <>
      {/* <div>
        <h1>Task Manager</h1>
        <p>Current tasks: {tasks}</p>
        <button onClick={increasePopulation}>Add Task</button>
        <button onClick={removeAllTasks}>Remove All Tasks</button>
        <button onClick={() => updateTasks(10)}>Set Tasks to 10</button>
      </div> */}

      <TaskList/>

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

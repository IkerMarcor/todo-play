import "./App.css";

import Play from "@/components/icons/Play";

import { Button } from "@/components/ui/button";

import AddTask from "@/components/AddTask";
import TaskList from "@/components/TaskList"

function App() {

  return (
    <>
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

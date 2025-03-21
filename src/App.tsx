import "./App.css";

import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";

import AddTask from "@/components/AddTask";
import TaskList from "@/components/TaskList";
import { Card } from "@/components/ui/card";

function App() {
  return (
    <>
      <Card>
        <TaskList />
      </Card>

      <div className="flex justify-between my-4">
        <Button className="w-2/5">Filter</Button>
        <AddTask />
      </div>
    </>
  );
}

export default App;

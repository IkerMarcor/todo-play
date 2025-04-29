import "./App.css";

import { Button } from "@/components/ui/button";

import AddTask from "@/components/AddTaskDialog";
import TaskList from "@/components/TaskList";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Toaster } from "sonner";
import DeleteAllTaskButton from "@/components/DeleteAllTaskButton";
import DeleteAllTaskAlert from "./components/DeleteAllTaskAlert";

function App() {
  return (
    <>
      <Toaster/>

      <ScrollArea className="h-[calc(100dvh*3/4)] w-full rounded-md border p-4">
        <TaskList />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex justify-between my-4">
        <Button className="w-2/5">Filter</Button>
        <DeleteAllTaskButton/>
        <DeleteAllTaskAlert/>
        <AddTask />
      </div>
    </>
  );
}

export default App;

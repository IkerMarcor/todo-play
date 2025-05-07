import "./App.css";
import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddTask from "@/components/AddTaskDialog";
import TaskList from "@/components/TaskList";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Toaster } from "sonner";
import DeleteAllTaskButton from "@/components/DeleteAllTaskButton";
import DeleteAllTaskAlert from "./components/DeleteAllTaskAlert";
import PlayButton from "./components/PlayButton";
import useToggleStore from "./store/useToggleStore";

function App() {
  const disableToggle = useToggleStore((s) => s.disableToggle);

  return (
    <>
      <Toaster richColors />

      <ScrollArea className="h-[calc(100dvh*3/4)] w-full rounded-md border p-4">
        <TaskList />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="grid grid-cols-1 md:grid-cols-4 justify-center gap-2 m-2">
        <PlayButton disabled={disableToggle}/>
        <Button disabled={disableToggle}>
          <ListFilter />
          Filter
        </Button>
        <AddTask/>
        <DeleteAllTaskButton disabled={disableToggle}/>
        <DeleteAllTaskAlert/>
      </div>
    </>
  );
}

export default App;

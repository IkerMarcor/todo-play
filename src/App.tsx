import "./App.css";
import TaskList from "@/components/TaskList";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Toaster } from "sonner";
import FilterDropdownMenu from "@/components/FilterDropdownMenu";
import DeleteAllTaskButton from "@/components/DeleteAllTaskButton";
import DeleteAllTaskAlert from "./components/DeleteAllTaskAlert";
import PlayButton from "./components/PlayButton";
import useToggleStore from "./store/useToggleStore";
import AddTaskDialog from "./components/AddTaskDialog";
import SortDropdownMenu from "./components/SortDropdownMenu";
import usePlayStore from "./store/usePlayStore";

function App() {
  const disableToggle = useToggleStore((s) => s.disableToggle);
  const isPlaying = usePlayStore((s) => s.isPlaying);

  return (
    <>
      <Toaster richColors />

      <ScrollArea className="h-[calc(100dvh*3/4)] w-full rounded-md border p-4">
        <TaskList />
        {!isPlaying && (
          <div className="absolute bottom-4 right-4 z-50 shadow-lg hover:shadow-xl transition-shadow">
            <AddTaskDialog />
          </div>
        )}
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-2 m-2">
        <PlayButton disabled={disableToggle} />
        <FilterDropdownMenu disabled={disableToggle} />
        <SortDropdownMenu disabled={disableToggle} />
        <DeleteAllTaskButton disabled={disableToggle} />
        <DeleteAllTaskAlert />
      </div>
    </>
  );
}

export default App;

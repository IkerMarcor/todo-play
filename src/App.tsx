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
import AddBreak from "./components/AddBreak";
import SortDropdownMenu from "./components/SortDropdownMenu";
import usePlayStore from "./store/usePlayStore";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import AddPresetTask from "@/components/AddPresetTask";

function App() {
  const disableToggle = useToggleStore((s) => s.disableToggle);
  const isPlaying = usePlayStore((s) => s.isPlaying);
  const playModeToggle = useToggleStore((s) => s.playModeToggle);
  const toggle = useToggleStore((s) => s.toggle);

  return (
    <>
      <Toaster richColors />

      <ScrollArea className="h-[calc(100dvh*3/4)] w-full rounded-md border p-4">
        <TaskList />
        {!isPlaying && (
          <div className="flex space-x-1 absolute bottom-4 right-4 z-50">
            <AddTaskDialog />
            <AddPresetTask />
            {playModeToggle && <AddBreak />}
          </div>
        )}
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      <div className="grid grid-cols-1 justify-center gap-2 m-2">
        <div className="flex items-center justify-center space-x-2">
          <Switch
            id="play-mode"
            checked={playModeToggle}
            onCheckedChange={() => toggle("playModeToggle")}
          />
          <Label htmlFor="play-mode">Play Mode</Label>
        </div>
        {playModeToggle ? (
          <>
            <PlayButton disabled={disableToggle} />
            <FilterDropdownMenu disabled={disableToggle} />
            <SortDropdownMenu disabled={disableToggle} />
          </>
        ) : (
          <>
            <DeleteAllTaskButton disabled={disableToggle} />
            <DeleteAllTaskAlert />
          </>
        )}
      </div>
    </>
  );
}

export default App;

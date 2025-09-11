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
  const styleButtons = playModeToggle ? "grid grid-cols-1 m-2 items-center" : "grid grid-cols-3 gap-2 m-2 items-center";

  return (
    <>
      <Toaster richColors />
      {/* Header */}
      <div className="flex flex-row space-x-4 items-center justify-between">
        <span className="flex flex-row space-x-2 items-center text-2xl font-bold m-2">
          <img className="h-10" src="./src/assets/logo.png" alt="Logo" /> Todo
          Play
        </span>
        <div className="flex space-x-2 m-2">
          <Switch
            id="play-mode"
            checked={playModeToggle}
            onCheckedChange={() => toggle("playModeToggle")}
          />
          <Label htmlFor="play-mode">Play Mode</Label>
        </div>
      </div>

      <ScrollArea className="h-[calc(100dvh*4/6)] w-full rounded-md border p-4">
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

      <div className={styleButtons}>
        {playModeToggle ? (
          <PlayButton disabled={disableToggle} />
        ) : (
          <>
            <DeleteAllTaskButton disabled={disableToggle} />
            <DeleteAllTaskAlert />
            <FilterDropdownMenu disabled={disableToggle} />
            <SortDropdownMenu disabled={disableToggle} />
          </>
        )}
      </div>
    </>
  );
}

export default App;

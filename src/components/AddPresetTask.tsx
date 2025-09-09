import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import useToggleStore from "@/store/useToggleStore";
import { Plus } from "lucide-react";

export default function AddPresetTask() {
  const { selectedTaskId } = useSelectedTaskStore();
  const { playModeToggle } = useToggleStore();
  const createTask = useTaskStore((s) => s.createTask);
  const presets = [
    {
      id: 1,
      name: "Morning Routine",
      description: "Start your day with a set of tasks to boost productivity.",
      priority: "High",
      time: 60,
    },
    {
      id: 2,
      name: "Workout Session",
      description: "A series of exercises to keep you fit and healthy.",
      priority: "Medium",
      time: 45,
    },
    {
      id: 3,
      name: "Study Block",
      description: "Focused study time for learning new skills or subjects.",
      priority: "High",
      time: 90,
    },
    {
      id: 4,
      name: "Project Work",
      description:
        "Dedicated time for working on your projects or assignments.",
      priority: "High",
      time: 120,
    },
    {
      id: 5,
      name: "Evening Wind Down",
      description: "Relaxing activities to help you unwind before bed.",
      priority: "Low",
      time: 30,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="shadow-lg hover:shadow-xl transition-shadow"
          variant="outline"
        >
          {" "}
          <Plus /> Tasks
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Tasks</DropdownMenuLabel>
        <DropdownMenuGroup>
          {presets.map((preset) => (
            <DropdownMenuItem
              key={preset.id}
              onClick={() =>
                createTask(
                  preset.name,
                  preset.description,
                  preset.priority,
                  preset.time,
                  selectedTaskId || playModeToggle ? true : false
                )
              }
            >
              {preset.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Add new preset...</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

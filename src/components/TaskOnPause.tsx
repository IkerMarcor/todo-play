import { Play } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useTaskStore from "@/store/useTaskStore";
import { useTimerStore } from "@/store/useTimerStore";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";

interface TaskOnPauseProps {
  id: number;
  index: number;
  name: string;
  priority: string;
  description: string;
  locked: boolean; // Optional prop to indicate if the task is locked
  type: string;
}

export default function TaskOnPause(props: TaskOnPauseProps) {
  const updateTask = useTaskStore((s) => s.updateTask);
  const setSelectedTaskId = useSelectedTaskStore((s) => s.setSelectedTaskId);
  const { resume, timers, startReset } = useTimerStore();

  const actionHandler = () => {
    timers[props.id].isCompleted ? startReset(props.id) : resume(props.id);
    setSelectedTaskId(props.id);
    updateTask(props.id, { state: "inProgress" });
  };

  const isLocked = props.locked;

  const tabIndex = isLocked ? -1 : 0;

  const className = [
    "opacity-40 text-pretty break-words duration-300 ease-in-out",
    isLocked
      ? "cursor-default"
      : "cursor-pointer hover:opacity-30 hover:drop-shadow-xl hover:-translate-y-2",
    props.type === "break"
      ? "bg-yellow-100 dark:bg-yellow-900"
      : "bg-blue-100 dark:bg-blue-900",
  ].join(" ");

  const handleClick = isLocked ? undefined : actionHandler;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isLocked && e.key === "Enter") {
      actionHandler();
    }
  };

  return (
    <Card
      tabIndex={tabIndex}
      className={className}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <CardHeader>
        <div className="flex justify-between">
          <Badge>{props.index}</Badge>
          <div></div>
          {props.priority !== "N" && <Badge> Priority {props.priority}</Badge>}
        </div>
        <h1 className="font-semibold line-clamp-2 text-xl">{props.name}</h1>
      </CardHeader>

      <CardContent className="grid gap-4">
        <p className="text-gray-500 line-clamp-8">{props.description}</p>
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <Button className="w-full" type="button" disabled>
          <Play /> Resume
        </Button>
      </CardFooter>
    </Card>
  );
}

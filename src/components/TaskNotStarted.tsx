import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import useTaskStore from "@/store/useTaskStore";
import { useTimerStore } from "@/store/useTimerStore";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import { toast } from "sonner";
import { getTodayTime } from "@/middleware";

interface TaskNotStartedProps {
  id: number;
  name: string;
  locked: boolean;
  type: string;
}

export default function TaskNotStarted(props: TaskNotStartedProps) {
  const setSelectedTaskId = useSelectedTaskStore((s) => s.setSelectedTaskId);
  const updateTask = useTaskStore((s) => s.updateTask);
  const startReset = useTimerStore((s) => s.startReset);

  const actionHandler = () => {
    setSelectedTaskId(props.id);
    updateTask(props.id, { state: "inProgress" });
    startReset(props.id);
    toast.info(`New task started at ${getTodayTime()}`);
  };

  const isLocked = props.locked;
  const handleClick = isLocked ? undefined : actionHandler;
  const className = [
    "opacity-40 text-pretty break-words duration-300 ease-in-out",
    isLocked
      ? "cursor-default"
      : "cursor-pointer hover:opacity-30 hover:drop-shadow-xl hover:-translate-y-2",
    props.type === "break"
      ? "bg-yellow-100 dark:bg-yellow-900"
      : "bg-blue-100 dark:bg-blue-900",
  ].join(" ");

  return (
    <Button
      className={className}
      variant={"outline"}
      onClick={handleClick}
    >
      <Label>{props.name}</Label>
      <Badge>
        <Play />
      </Badge>
    </Button>
  );
}

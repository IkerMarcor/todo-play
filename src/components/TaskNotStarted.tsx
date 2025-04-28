import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import useTaskStore from "@/store/useTaskStore";
import { useTimerStore } from "@/store/useTimerStore";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";

interface TaskNotStartedProps {
  id: number;
  name: string;
  time: string;
  isLocked: boolean;
}

export default function TaskNotStarted(props: TaskNotStartedProps) {
  const setSelectedTaskId = useSelectedTaskStore((s) => s.setSelectedTaskId);
  const updateTask = useTaskStore((s) => s.updateTask);
  const startReset = useTimerStore((s) => s.startReset);

  return (
    <Button
      variant="disabled"
      onClick={() => {
        if (!props.isLocked) {
          setSelectedTaskId(props.id);
          updateTask(props.id, { status: "inProgress" });
          startReset(Number(props.time));
        }
      }}
    >
      <Label>{props.name}</Label>
      <Badge>
        <Play />
      </Badge>
    </Button>
  );
}

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import useCRUDTaskStore from "@/store/useTaskStore";
import { useTimerStore } from "@/store/useTimerStore";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";

interface TaskNotStartedProps {
  id: number;
  name: string;
  time: string;
}

export default function TaskNotStarted(props: TaskNotStartedProps) {
  const setSelectedTaskId = useSelectedTaskStore((s) => s.setSelectedTaskId);
  const updateTask = useCRUDTaskStore((s) => s.updateTask);
  const startReset = useTimerStore((s) => s.startReset);

  return (
    <Button
      variant="disabled"
      onClick={() => {
        setSelectedTaskId(props.id);
        updateTask(props.id, { status: "inProgress" });
        startReset(Number(props.time));
      }}
    >
      <Label>{props.name}</Label>
      <Badge>
        <Play />
      </Badge>
    </Button>
  );
}

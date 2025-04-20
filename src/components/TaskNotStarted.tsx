import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import useCRUDTaskStore from "@/store/useTaskStore";
import { getTaskById } from "@/middleware";
import { useTimerStore } from "@/store/useTimerStore";

export default function TaskNotStarted({ id }: { id: number }) {
  const task = getTaskById(id);
  const { updateTask } = useCRUDTaskStore();
  const { startReset } = useTimerStore();

  return (
    <Button
      variant="disabled"
      onClick={() => {
        updateTask(id, { status: "inProgress" });
        startReset(Number(task?.initTime));
      }}
    >
      <Label>{task?.name}</Label>
      <Badge>
        <Play />
      </Badge>
    </Button>
  );
}

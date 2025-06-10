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
}

export default function TaskNotStarted(props: TaskNotStartedProps) {
  const setSelectedTaskId = useSelectedTaskStore((s) => s.setSelectedTaskId);
  const updateTask = useTaskStore((s) => s.updateTask);
  const startReset = useTimerStore((s) => s.startReset);

  return (
    <Button
      className="opacity-40 text-pretty break-words hover:opacity-30 hover:drop-shadow-xl hover:-translate-y-2"
      variant={"outline"}
      onClick={() => {
        setSelectedTaskId(props.id);
        updateTask(props.id, { status: "inProgress" });
        startReset(props.id);
        toast.info(`New task started at ${getTodayTime()}`);
      }}
    >
      <Label>{props.name}</Label>
      <Badge>
        <Play />
      </Badge>
    </Button>
  );
}

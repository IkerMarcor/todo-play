import { Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTimerStore } from "@/store/useTimerStore";
import useTaskStore from "@/store/useTaskStore";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";

export default function PauseTaskButton({ id }: { id: number }) {
  const pause = useTimerStore((s) => s.pause);
  const updateTask = useTaskStore((s) => s.updateTask);
  const setSelectedTaskId = useSelectedTaskStore((s) => s.setSelectedTaskId);

  return (
    <Button
      className="w-full"
      type="button"
      onClick={() => {
        pause(id);
        updateTask(id, { status: "onPause" });
        setSelectedTaskId(null);
      }}
    >
      <Pause /> Pause
    </Button>
  );
}

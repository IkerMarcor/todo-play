import { Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import { useTimerStore } from "@/store/useTimerStore";

export default function PauseTaskButton({ id }: { id: number }) {
  const setSelectedTaskId = useSelectedTaskStore((s) => s.setSelectedTaskId);
  const updateTask = useTaskStore((s) => s.updateTask);
  const pause = useTimerStore((s) => s.pause);
  const remainTime = useTimerStore((s) => s.remainTime);
  
  return (
    <Button
      className="w-full"
      type="button"
      onClick={() => {
        setSelectedTaskId(null);
        updateTask(id, {
          status: "onPause",
          remainTime: String(remainTime),
        });
        pause();
      }}
    >
      <Pause /> Pause
    </Button>
  );
}

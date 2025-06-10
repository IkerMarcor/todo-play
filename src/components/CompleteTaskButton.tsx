import { Check } from "lucide-react";
import {toast} from "sonner"
import { Button } from "@/components/ui/button";
import { useTimerStore } from "@/store/useTimerStore";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import { getTodayDate } from "@/middleware";

export default function CompleteTaskButton({ id }: { id: number }) {
    const pause = useTimerStore(s => s.pause);
    const resume = useTimerStore(s => s.resume);
    const setSelectedTaskId = useSelectedTaskStore(s => s.setSelectedTaskId)
    const updateTask = useTaskStore(s => s.updateTask)

  return (
    <Button
      className="w-full"
      type="button"
      onClick={() => {
        pause(id);
        setSelectedTaskId(null);
        updateTask(id, { status: "completed" });
        toast(`🎉 Congrats on completing your task!`, {
          description: getTodayDate(),
          action: {
            label: "Undo",
            onClick: () => {
              updateTask(id, { status: "inProgress" });
              setSelectedTaskId(id);
              resume(id);
            },
          },
        });
      }}
    >
      <Check /> Mark as completed
    </Button>
  );
}

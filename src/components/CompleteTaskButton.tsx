import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTimerStore } from "@/store/useTimerStore";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import { getTodayDate } from "@/middleware";
import { useNotificationToast } from "@/hooks/useNotificationSound";

export default function CompleteTaskButton({ id }: { id: number }) {
  const pause = useTimerStore((s) => s.pause);
  const resume = useTimerStore((s) => s.resume);
  const setSelectedTaskId = useSelectedTaskStore((s) => s.setSelectedTaskId);
  const updateTask = useTaskStore((s) => s.updateTask);
  const notify = useNotificationToast();

  return (
    <Button
      className="w-full"
      type="button"
      onClick={() => {
        pause(id);
        setSelectedTaskId(null);
        updateTask(id, { status: "completed" });
        notify("default", `🎉 Congrats on completing your task!`, {
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

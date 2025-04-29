import { Trash2 } from "lucide-react";
import {toast} from "sonner"
import { getTodayDate } from "@/middleware";
import { Button } from "@/components/ui/button";
import useTaskStore from "@/store/useTaskStore";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";

export default function DeleteTaskButton({ id }: { id: number }) {
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const setSelectedTaskId = useSelectedTaskStore((s) => s.setSelectedTaskId)
  return (
    <Button
      className="w-full"
      type="button"
      variant={"destructive"}
      onClick={() => {
        setSelectedTaskId(null);
        deleteTask(id);
        toast("❌ Your task has been deleted");

      }}
    >
      <Trash2 /> Delete
    </Button>
  );
}

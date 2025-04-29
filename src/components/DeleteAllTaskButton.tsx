import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useToggleStore from "@/store/useToggleStore";
import useTaskStore from "@/store/useTaskStore";
import { toast } from "sonner";

export default function DeleteAllTaskButton() {
  const setOpen = useToggleStore((s) => s.setOpen);
  const tasks = useTaskStore((s) => s.tasks);
  return (
    <Button
      onClick={() => {
        if (Object.keys(tasks).length < 2) {
          toast.warning("Not enough tasks to delete");
        } else {
          setOpen("deleteAllTaskToggle", true);
          console.log(Object.keys(tasks).length);
        }
      }}
    >
      <Trash2 />
      Delete All
    </Button>
  );
}

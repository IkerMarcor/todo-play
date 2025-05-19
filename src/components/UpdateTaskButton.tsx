import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useToggleStore from "@/store/useToggleStore";
import { useTimerStore } from "@/store/useTimerStore";

export default function UpdateTaskButton({ id }: { id: number }) {
  const setOpen = useToggleStore((s) => s.setOpen);
  const setSelectedTaskId = useSelectedTaskStore((s) => s.setSelectedTaskId);
  const pause = useTimerStore((s) => s.pause);
  return (
    <Button
      className="w-full"
      type="button"
      variant={"secondary"}
      onClick={() => {
        setSelectedTaskId(id);
        setOpen("updateTaskToggle", true);
        pause();
      }}
    >
      <Pencil /> Edit
    </Button>
  );
}

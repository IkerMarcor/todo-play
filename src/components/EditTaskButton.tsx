import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useToggleStore from "@/store/useToggleStore";

export default function EditTaskButton({ id }: { id: number }) {
  const setOpen = useToggleStore((s) => s.setOpen);
  const setSelectedTaskId = useSelectedTaskStore((s) => s.setSelectedTaskId);
  return (
    <Button
      className="w-full"
      type="button"
      variant={"secondary"}
      onClick={() => {
        setSelectedTaskId(id);
        setOpen("updateTaskToggle", true);
      }}
    >
      <Pencil /> Edit
    </Button>
  );
}

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useToggleStore from "@/store/useToggleStore";

export default function DeleteAllTaskButton({disabled}:{disabled:boolean}) {
  const setOpen = useToggleStore((s) => s.setOpen);
  return (
    <Button
    disabled={disabled}
    variant={"destructive"}
      onClick={() => {
        setOpen("deleteAllTaskToggle", true);
      }}
    >
      <Trash2 />
      Delete All
    </Button>
  );
}

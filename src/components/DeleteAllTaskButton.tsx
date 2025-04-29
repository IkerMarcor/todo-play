import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useToggleStore from "@/store/useToggleStore";

export default function DeleteAllTaskButton() {
  const { setOpen } = useToggleStore();
  return (
    <Button onClick={() => setOpen("deleteAllTaskToggle", true)}>
      <Trash2/>Delete All
    </Button>
  );
}

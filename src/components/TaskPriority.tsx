import { Badge } from "@/components/ui/badge";
import useToggleStore from "@/store/useToggleStore";
import { Dialog } from "@/components/ui/dialog";

export default function TaskPriority({ priority }: { priority: string }) {
  const { setOpen, updatePriorityToggle } = useToggleStore();
  return (
    <Dialog open={updatePriorityToggle}>
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => setOpen("updatePriorityToggle", true)}
      >
        <Badge> Priority {priority}</Badge>
      </button>
    </Dialog>
  );
}

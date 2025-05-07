import { Plus } from "lucide-react"
import AddTask from "@/components/AddTask";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useToggleStore from "@/store/useToggleStore";

export default function AddTaskDialog() {
  const { createTaskToggle, setOpen } = useToggleStore();
  return (
    <Dialog open={createTaskToggle}>
      <Button className="basis-1/3" onClick={() => setOpen("createTaskToggle", true)}>
        <Plus/> New task
      </Button>
      <DialogContent>
        <AddTask />
      </DialogContent>
    </Dialog>
  );
}

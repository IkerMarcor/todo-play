import { Plus } from "lucide-react"
import AddTask from "@/components/AddTask";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useToggleStore from "@/store/useToggleStore";

export default function AddTaskDialog() {
  const { createTaskToggle, setOpen } = useToggleStore();
  return (
    <Dialog open={createTaskToggle}>
      <Button variant={"outline"} onClick={() => setOpen("createTaskToggle", true)}>
        <Plus/> New task
      </Button>
      <DialogContent>
        <DialogTitle>Add New Task</DialogTitle>
        <AddTask />
      </DialogContent>
    </Dialog>
  );
}

import { Plus } from "lucide-react"
import AddTaskForm from "@/components/AddTask";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useToggleStore from "@/store/useToggleStore";
import FixedDialogClose from "@/components/FixedDialogClose"

export default function AddTaskDialog() {
  const { createTaskToggle, setOpen } = useToggleStore();
  return (
    <Dialog open={createTaskToggle}>
      <Button className="w-2/5" onClick={() => setOpen("createTaskToggle", true)}>
        <Plus/> New task
      </Button>
      <DialogContent>
        <FixedDialogClose toggleKey="createTaskToggle"/>
        <AddTaskForm />
      </DialogContent>
    </Dialog>
  );
}

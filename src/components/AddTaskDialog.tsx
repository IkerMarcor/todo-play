import { Plus } from "lucide-react"
import AddTaskForm from "@/components/AddTaskForm";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useToggleStore from "@/store/useToggleStore";

export default function AddTaskDialog() {
  const { addTaskToggle, setOpen } = useToggleStore();
  return (
    <AlertDialog open={addTaskToggle}>
      <Button className="w-2/5" onClick={() => setOpen("addTaskToggle", true)}>
        <Plus/> New task
      </Button>
      <AlertDialogContent>
        <AddTaskForm />
      </AlertDialogContent>
    </AlertDialog>
  );
}

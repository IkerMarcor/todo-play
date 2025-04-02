import { Plus } from "lucide-react"
import AddTaskForm from "@/components/AddTaskForm";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useToggleStore from "@/store/useToggleStore";

export default function AddTaskDialog() {
  const { isOpen, setOpen } = useToggleStore();
  return (
    <AlertDialog open={isOpen}>
      <Button className="w-2/5 cursor-pointer" onClick={() => setOpen(true)}>
        <Plus/> New task
      </Button>
      <AlertDialogContent>
        <AddTaskForm />
      </AlertDialogContent>
    </AlertDialog>
  );
}

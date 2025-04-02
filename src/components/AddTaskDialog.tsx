import AddTaskForm from "@/components/AddTaskForm";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useToggleStore from "@/store/useToggleStore";

export default function AddTaskDialog() {
  const {isOpen, setOpen} = useToggleStore();
  return (
    <AlertDialog open={isOpen} >
        <Button className="w-2/5" onClick={() => setOpen(true)}>
          Add New Task
        </Button>
      <AlertDialogContent>
        <AddTaskForm/>
      </AlertDialogContent>
    </AlertDialog>
  );
}

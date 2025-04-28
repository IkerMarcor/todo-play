import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import useTaskStore from "@/store/useTaskStore";
import useToggleStore from "@/store/useToggleStore";
import { getTodayDate } from "@/middleware";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";

export default function DeleteTask({ id }: { id: number }) {
  const { deleteTask } = useTaskStore();
  const { deleteTaskToggle, toggle } = useToggleStore();
  const { setSelectedTaskId } = useSelectedTaskStore();
  return (
    <AlertDialog open={deleteTaskToggle}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your task
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button type="button" onClick={() => toggle("deleteTaskToggle")}>
            Cancel
          </Button>
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => {
              deleteTask(id);
              toggle("deleteTaskToggle");
              toast("❌ Your task has been deleted successfully", {
                description: getTodayDate(),
              });
              setSelectedTaskId(null);
            }}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

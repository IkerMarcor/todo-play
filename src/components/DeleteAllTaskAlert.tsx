import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useNotificationToast } from "@/hooks/useNotificationSound";
import { getTodayDate } from "@/middleware";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import useToggleStore from "@/store/useToggleStore";

export default function DeleteAllTaskAlert() {
  const deleteAllTaskToggle = useToggleStore((s) => s.deleteAllTaskToggle);
  const setSelectedTaskId = useSelectedTaskStore((s) => s.setSelectedTaskId);
  const deleteAllTask = useTaskStore((s) => s.deleteAllTask);
  const toggle = useToggleStore((s) => s.toggle);
  const notify = useNotificationToast();
  return (
    <AlertDialog open={deleteAllTaskToggle}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all your
            tasks from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button type="button" onClick={() => toggle("deleteAllTaskToggle")}>
            Cancel
          </Button>
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => {
              setSelectedTaskId(null);
              deleteAllTask();
              toggle("deleteAllTaskToggle");
              notify("default","🗑️ All your tasks had been deleted successfully", {
                description: getTodayDate(),
              });
            }}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

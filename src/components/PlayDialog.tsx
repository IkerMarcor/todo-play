import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import usePlayDialog from "@/hooks/usePlayDialog";
import usePlayStore from "@/store/usePlayStore";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import { useTimerStore } from "@/store/useTimerStore";
import { toast } from "sonner";

export default function PlayDialog() {
  const selectedTask = useSelectedTaskStore((e) => e.getSelectedTask());
  const { startReset, pause } = useTimerStore();
  const updateTask = useTaskStore((e) => e.updateTask);
  const nextTask = usePlayStore((e) => e.nextTask);
  const { dialogOpen, setDialogOpen } = usePlayDialog();

  if (selectedTask)
    return (
      <AlertDialog open={dialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You've ran out of time!</AlertDialogTitle>
            <AlertDialogDescription>
              You have two options you can choose from playing: Add 15 minutes
              to the current task or move on to the next task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => {
                startReset(selectedTask.id);
                setDialogOpen(false);
              }}
            >
              Add 15 min
            </Button>
            <Button
              type="button"
              onClick={() => {
                toast.info("Your task has been sent to pending", {
                  description:
                    "You can always go back to it when you complete play.",
                });
                updateTask(selectedTask.id, {
                  status: "onPause",
                });
                pause(selectedTask.id);
                nextTask();
                setDialogOpen(false);
              }}
            >
              Next Task
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
}

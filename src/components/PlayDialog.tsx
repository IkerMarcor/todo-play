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

export default function PlayDialog() {
  const selectedTask = useSelectedTaskStore((e) => e.getSelectedTask());
  const { addTime, stopAlarm } = useTimerStore();
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
              You have two options you can choose from playing: Add some time
              to the current task and continue playing or move on to the next task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => {
                stopAlarm();
                addTime(selectedTask.id);
                setDialogOpen(false);
              }}
            >
              Add Time
            </Button>
            <Button
              type="button"
              onClick={() => {
                stopAlarm();
                updateTask(selectedTask.id, {
                  status: "onPause",
                });
                nextTask("skipped");
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

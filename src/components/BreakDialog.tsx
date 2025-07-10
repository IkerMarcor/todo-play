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
import { usePlayStore } from "@/store/usePlayStore";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useTaskStore from "@/store/useTaskStore";
import { useTimerStore } from "@/store/useTimerStore";

export default function BreakDialog() {
  const selectedTask = useSelectedTaskStore((e) => e.getSelectedTask());
  const stopAlarm = useTimerStore((e) => e.stopAlarm);
  const updateTask = useTaskStore((e) => e.updateTask);
  const nextTask = usePlayStore((e) => e.nextTask);
  const { breakDialogOpen, resetDialogState } = usePlayDialog();

  if (selectedTask) {
    return (
      <AlertDialog open={breakDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Break Over!</AlertDialogTitle>
            <AlertDialogDescription>
              Time to get back to work! Your break has ended, and it's time to
              resume your tasks.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => {
                stopAlarm();
                updateTask(selectedTask.id, {
                  state: "onPause",
                });
                nextTask("break");
                resetDialogState();
              }}
            >
              Add Time
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
}

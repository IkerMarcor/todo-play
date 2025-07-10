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

export default function FinalPlayDialog() {
  const selectedTask = useSelectedTaskStore((e) => e.getSelectedTask());
  const setSelectedTaskId = useSelectedTaskStore((e) => e.setSelectedTaskId);
  const { addTime, stopAlarm } = useTimerStore();
  const updateTask = useTaskStore((e) => e.updateTask);
  const completePlay = usePlayStore((e) => e.completePlay);
  const { finalDialogOpen, resetDialogState } = usePlayDialog();

  if (selectedTask)
    return (
      <AlertDialog open={finalDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You've ran out of time!</AlertDialogTitle>
            <AlertDialogDescription>
              You have two options you can choose from playing: Add some time
              to the current task or complete play.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => {
                stopAlarm();
                addTime(selectedTask.id);
                resetDialogState();
              }}
            >
              Add Time
            </Button>
            <Button
              type="button"
              onClick={() => {
                stopAlarm();
                updateTask(selectedTask.id, {
                  state: "onPause",
                });
                completePlay();
                setSelectedTaskId(null);
                resetDialogState();
              }}
            >
              Complete Play
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
}

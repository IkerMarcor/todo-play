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

export default function FinalPlayDialog() {
  const selectedTask = useSelectedTaskStore((e) => e.getSelectedTask());
  const setSelectedTaskId = useSelectedTaskStore((e) => e.setSelectedTaskId);
  const startReset = useTimerStore((e) => e.startReset);
  const updateTask = useTaskStore((e) => e.updateTask);
  const completePlay = usePlayStore((e) => e.completePlay);
  const { finalDialogOpen, setFinalDialogOpen } = usePlayDialog();

  if (selectedTask)
    return (
      <AlertDialog open={finalDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You've ran out of time!</AlertDialogTitle>
            <AlertDialogDescription>
              You have two options you can choose from playing: Add 15 minutes
              to the current task or complete play.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => {
                startReset(selectedTask.time, 15);
                setFinalDialogOpen(false);
              }}
            >
              Add 15 min
            </Button>
            <Button
              type="button"
              onClick={() => {
                updateTask(selectedTask.id, {
                  status: "onPause",
                  remainTime: selectedTask.time,
                });
                completePlay();
                setSelectedTaskId(null);
                setFinalDialogOpen(false);
              }}
            >
              Complete Play
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
}

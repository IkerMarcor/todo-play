import { Check, Trash2, Pause, Pencil } from "lucide-react";
import { toast } from "sonner";
import { getTodayDate } from "@/middleware";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CountdownTimer from "./CountdownTimer";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useToggleStore from "@/store/useToggleStore";
import useCRUDTaskStore from "@/store/useTaskStore";
import { useTimerStore } from "@/store/useTimerStore";

export default function TaskInProgress({ id }: { id: number }) {
  const { pause, startReset, remainTime } = useTimerStore();
  const { updateTask } = useCRUDTaskStore();
  const { setSelectedTaskId } = useSelectedTaskStore();
  const { setOpen } = useToggleStore();
  const taskSelected = useSelectedTaskStore((state)=> state.getSelectedTask())

  return (
    <Card className="cursor-default text-pretty break-words hover:drop-shadow-xl hover:-translate-y-2 duration-300 ease-in-out">
      <CardHeader>
        <div className="flex justify-between">
          <Badge></Badge>
          <div></div>
          <Badge> Priority {taskSelected?.priority}</Badge>
        </div>
        <h1 className="font-semibold line-clamp-2 text-xl">{taskSelected?.name}</h1>
      </CardHeader>

      <CardContent className="grid gap-4">
        <p className="text-gray-500 line-clamp-8">{taskSelected?.description}</p>
        <CountdownTimer />
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <Button
          className="w-full"
          type="button"
          onClick={() => {
            setSelectedTaskId(id)
            updateTask(id, { status: "onPause" , remainTime: String(remainTime) });
            pause();
          }}
        >
          <Pause /> Pause
        </Button>
        <Button
          className="w-full"
          type="button"
          onClick={() => {
            updateTask(id, { status: "completed" });
            toast(`🎉 Congrats on completing your task!`, {
              description: getTodayDate(),
              action: {
                label: "Undo",
                onClick: () => {
                  updateTask(id, { status: "inProgress" });
                  startReset(Number(taskSelected?.initTime))
                },
              },
            });
          }}
        >
          <Check /> Mark as completed
        </Button>
        <Button
          className="w-full"
          type="button"
          variant={"destructive"}
          onClick={() => {
            setSelectedTaskId(id);
            setOpen("deleteTaskToggle", true);
          }}
        >
          <Trash2 /> Delete
        </Button>
        <Button
          className="w-full"
          type="button"
          variant={"secondary"}
          onClick={() => {
            setSelectedTaskId(id);
            setOpen("updateTaskToggle", true); //TODO: time needs to reset to the initial selected
          }}
        >
          <Pencil /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
}

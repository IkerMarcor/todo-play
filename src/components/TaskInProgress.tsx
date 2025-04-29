import { Check, Pause, Pencil } from "lucide-react";
import DeleteTaskButton from "./DeleteTaskButton";
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
import useTaskStore from "@/store/useTaskStore";
import { useTimerStore } from "@/store/useTimerStore";

interface TaskInProgressProps {
  id: number;
  name: string;
  priority: string;
  description: string;
}

export default function TaskInProgress(props: TaskInProgressProps) {
  const { pause, resume, remainTime } = useTimerStore();
  const updateTask = useTaskStore((s) => s.updateTask);
  const setSelectedTaskId = useSelectedTaskStore((s) => s.setSelectedTaskId);
  const setOpen = useToggleStore((s) => s.setOpen);

  return (
    <Card className="cursor-default text-pretty break-words hover:drop-shadow-xl hover:-translate-y-2 duration-300 ease-in-out">
      <CardHeader>
        <div className="flex justify-between">
          <Badge></Badge>
          <div></div>
          <Badge> Priority {props.priority}</Badge>
        </div>
        <h1 className="font-semibold line-clamp-2 text-xl">{props.name}</h1>
      </CardHeader>

      <CardContent className="grid gap-4">
        <p className="text-gray-500 line-clamp-8">{props.description}</p>
        <CountdownTimer />
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <Button
          className="w-full"
          type="button"
          onClick={() => {
            setSelectedTaskId(null);
            updateTask(props.id, {
              status: "onPause",
              remainTime: String(remainTime),
            });
            pause();
          }}
        >
          <Pause /> Pause
        </Button>
        <Button
          className="w-full"
          type="button"
          onClick={() => {
            pause();
            setSelectedTaskId(null);
            updateTask(props.id, { status: "completed" });
            toast(`🎉 Congrats on completing your task!`, {
              description: getTodayDate(),
              action: {
                label: "Undo",
                onClick: () => {
                  updateTask(props.id, { status: "inProgress" });
                  setSelectedTaskId(props.id);
                  resume();
                },
              },
            });
          }}
        >
          <Check /> Mark as completed
        </Button>
        <DeleteTaskButton id={props.id} />
        <Button
          className="w-full"
          type="button"
          variant={"secondary"}
          onClick={() => {
            setSelectedTaskId(props.id);
            setOpen("updateTaskToggle", true);
          }}
        >
          <Pencil /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
}

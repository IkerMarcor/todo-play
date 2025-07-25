import { Check, Pause } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CountdownTimer from "./CountdownTimer";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useTimerStore } from "@/store/useTimerStore";
import useTaskStore from "@/store/useTaskStore";
import usePlayStore from "@/store/usePlayStore";

interface TaskInProgressProps {
  id: number;
  index: number;
  name: string;
  priority: string;
  description: string;
  type: string;
}

export default function TaskInProgress(props: TaskInProgressProps) {
  const { pause } = useTimerStore();
  const updateTask = useTaskStore().updateTask;
  const stopPlay = usePlayStore().stopPlay;
  const nextTask = usePlayStore().nextTask;

  const className = [
    "cursor-default text-pretty break-words hover:drop-shadow-xl hover:-translate-y-2 duration-300 ease-in-out",
    props.type === "break"
      ? "bg-yellow-100 dark:bg-yellow-900"
      : "bg-blue-100 dark:bg-blue-900",
  ].join(" ");

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between">
          <Badge>{props.index}</Badge>
          <div></div>
          {props.priority !== "N" && <Badge> Priority {props.priority}</Badge>}
        </div>
        <h1 className="font-semibold line-clamp-2 text-xl">{props.name}</h1>
      </CardHeader>

      <CardContent className="grid gap-4">
        <p className="text-gray-500 line-clamp-8">{props.description}</p>
        <CountdownTimer id={props.id} />
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <Button
          className="w-full"
          type="button"
          onClick={() => {
            stopPlay("This automatically resets Play");
            pause(props.id);
            updateTask(props.id, { state: "onPause" });
          }}
        >
          <Pause /> Pause Play
        </Button>
        {props.type === "task" && (
          <Button
            className="w-full"
            type="button"
            variant={"secondary"}
            onClick={() => {
              pause(props.id);
              updateTask(props.id, { state: "completed" });
              nextTask("completed");
            }}
          >
            <Check /> Mark as completed
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

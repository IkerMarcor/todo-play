import { Play } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useTaskStore from "@/store/useTaskStore";
import { useTimerStore } from "@/store/useTimerStore";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";

interface TaskOnPauseProps {
  id: number;
  index: number;
  name: string;
  priority: string;
  description: string;
}

export default function TaskOnPause(props: TaskOnPauseProps) {
  const updateTask = useTaskStore((s) => s.updateTask);
  const setSelectedTaskId = useSelectedTaskStore((s) => s.setSelectedTaskId);
  const resume = useTimerStore((s) => s.resume);

  const actionHandler = () => {
    setSelectedTaskId(props.id);
    resume(props.id);
    updateTask(props.id, { status: "inProgress" });
  };

  return (
    <Card
      className="opacity-40 text-pretty break-words hover:opacity-30 cursor-pointer hover:drop-shadow-xl hover:-translate-y-2 duration-300 ease-in-out"
      onClick={actionHandler}
      onKeyDown={(e) => e.key === "Enter" && actionHandler()}
    >
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
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <Button className="w-full" type="button" disabled>
          <Play /> Resume
        </Button>
      </CardFooter>
    </Card>
  );
}

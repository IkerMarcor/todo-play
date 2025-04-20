import { Play } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useCRUDTaskStore from "@/store/useTaskStore";
import { getTaskById } from "@/middleware";
import { useTimerStore } from "@/store/useTimerStore";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";

export default function TaskOnPause({ id }: { id: number }) {
  const { updateTask } = useCRUDTaskStore();
  const { resume } = useTimerStore();
  const { setSelectedTaskId } = useSelectedTaskStore();
  const task = getTaskById(id);

  return (
    <Card
      className="opacity-40 text-pretty break-words hover:opacity-30 cursor-pointer hover:drop-shadow-xl hover:-translate-y-2 duration-300 ease-in-out"
      onClick={() => {
        setSelectedTaskId(id);
        updateTask(id, { status: "inProgress" });
        resume();
      }}
    >
      <CardHeader>
        <div className="flex justify-between">
          <Badge></Badge>
          <div></div>
          <Badge> Priority {task?.priority}</Badge>
        </div>
        <h1 className="font-semibold line-clamp-2 text-xl">{task?.name}</h1>
      </CardHeader>

      <CardContent className="grid gap-4">
        <p className="text-gray-500 line-clamp-8">{task?.description}</p>
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <Button className="w-full" type="button" disabled>
          <Play /> Play
        </Button>
      </CardFooter>
    </Card>
  );
}

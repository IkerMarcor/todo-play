import DeleteTaskButton from "./DeleteTaskButton";
import { Badge } from "@/components/ui/badge";
import CountdownTimer from "./CountdownTimer";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import CompleteTaskButton from "@/components/CompleteTaskButton";
import UpdateTaskButton from "@/components/UpdateTaskButton";
import PauseTaskButton from "./PauseTaskButton";

interface TaskInProgressProps {
  id: number;
  index: number;
  name: string;
  priority: string;
  description: string;
}

export default function TaskInProgress(props: TaskInProgressProps) {
  return (
    <Card className="cursor-default text-pretty break-words hover:drop-shadow-xl hover:-translate-y-2 duration-300 ease-in-out">
      <CardHeader>
        <div className="flex justify-between">
          <Badge>{props.index}</Badge>
          <div></div>
          <Badge> Priority {props.priority}</Badge>
        </div>
        <h1 className="font-semibold line-clamp-2 text-xl">{props.name}</h1>
      </CardHeader>

      <CardContent className="grid gap-4">
        <p className="text-gray-500 line-clamp-8">{props.description}</p>
        <CountdownTimer id={props.id}/>
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <PauseTaskButton id={props.id} />
        <CompleteTaskButton id={props.id} />
        <DeleteTaskButton id={props.id} />
        <UpdateTaskButton id={props.id} />
      </CardFooter>
    </Card>
  );
}

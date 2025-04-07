import { Check, Play } from "lucide-react";
import DeleteTask from "./DeleteTask";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import TaskTitle from "./TaskTitle";
import TaskDescription from "./TaskDescription";

interface TaskContentProps {
  id: number;
  index: number;
  name: string;
  description: string;
  priority: string;
  status: string;
}

export default function TaskInProgress(props: TaskContentProps) {
  return (
    <>
      {props.status === "inProgress" ? (
        <Card className="text-pretty break-words">
          <CardHeader>
            <div className="flex justify-between">
              <Badge>{props.index}</Badge>
              <div></div>
              <Badge> Priority {props.priority}</Badge>
            </div>
            <TaskTitle title={props.name} />
          </CardHeader>

          <CardContent className="grid gap-4">
            <TaskDescription description={props.description} />
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <p>20:20</p>
              <Progress value={33} />
              <p>40:00</p>
            </div>
          </CardContent>
          <CardFooter className="flex-col">
            <Button className="w-full m-1" size={"lg"}>
              <Check /> Mark as completed
            </Button>
            <DeleteTask id={props.id} />
          </CardFooter>
        </Card>
      ) : props.status === "Completed" ? (
        <Button variant="outline" disabled>
          <Label className="text-green-600 line-through">{props.name}</Label>
          <Badge variant="completed">
            <Check />
          </Badge>
        </Button>
      ) : (
        <Button variant="outline" disabled>
          <Label>{props.name}</Label>
          <Badge>
            <Play />
          </Badge>
        </Button>
      )}
    </>
  );
}

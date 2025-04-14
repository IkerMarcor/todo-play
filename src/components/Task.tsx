import { Check, Pencil, Play } from "lucide-react";
import DeleteTask from "@/components/DeleteTask";
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

import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import useToggleStore from "@/store/useToggleStore";

interface TaskContentProps {
  id: number;
  index: number;
  name: string;
  description: string;
  priority: string;
  status: string;
}

export default function Task(props: TaskContentProps) {
  const { setSelectedTaskId } = useSelectedTaskStore();
  const { setOpen } = useToggleStore();
  return (
    <>
      {props.status === "inProgress" ? (
        <Card className="text-pretty break-words">
          <CardHeader>
            <div className="flex justify-between">
              <Badge className="cursor-default">{props.index}</Badge>
              <div></div>
              <Badge> Priority {props.priority}</Badge>
            </div>
            <h1 className="font-semibold line-clamp-2 text-xl">{props.name}</h1>
          </CardHeader>

          <CardContent className="grid gap-4">
            <p className="text-gray-500 line-clamp-8">{props.description}</p>
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
            <Button
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

import { Check, Pencil, Play, Trash2 } from "lucide-react";
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
import useCRUDTaskStore from "@/store/useCRUDTaskStore";
import { toast } from "sonner";
import { getTodayDate } from "@/constants";

interface TaskContentProps {
  id: number;
  index: number;
  name: string;
  description: string;
  priority: string;
  status: string;
}

export default function Task(props: TaskContentProps) {
  const { updateTask } = useCRUDTaskStore();
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
          <CardFooter className="flex-col space-y-2">
            <Button
              className="w-full"
              type="button"
              onClick={() => {
                updateTask(props.id, { status: "Completed" });
                toast(`🎉 Congrats on completing your task!`, {
                  description: getTodayDate(),
                  action: {
                    label: "Undo",
                    onClick: () =>
                      updateTask(props.id, { status: "inProgress" }),
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
                setSelectedTaskId(props.id);
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

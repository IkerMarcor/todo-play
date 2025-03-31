import { BellRing, Check, Play, Trash2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
interface Props {
  id: number;
  index: number;
  name: string;
  description: string;
  priority: string;
  status: string;
}
import useTaskStore from "@/store"

export default function TaskInProgress({
  id,
  index,
  name,
  description,
  priority,
  status,
}: Props) {
  const { deleteTask } = useTaskStore();
  return (
    <>
      {status === "inProgress" ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <Badge>{index}</Badge>
              <div></div>
              <Badge> Priority {priority}</Badge>
            </div>
            <h1 className="text-wrap break-all font-semibold line-clamp-2 text-xl">{name}</h1>
          </CardHeader>

          <CardContent className="grid gap-4">
            <p className="text-wrap break-all text-gray-500 line-clamp-8">{description}</p>
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <BellRing />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Push Notifications
                </p>
                <p className="text-sm text-muted-foreground">
                  Send notifications to device.
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
          <CardFooter className="flex-col">
            <Button className="w-full m-1" size={"lg"}>
              <Check /> Mark as completed
            </Button>
            <Button className="w-full m-1" size={"lg"} variant={"destructive"}
            onClick={() => {
              deleteTask(id);
            }}>
              <Trash2 /> Delete
            </Button>
          </CardFooter>
        </Card>
      ) : status === "Completed" ? (
        <Button variant="outline" disabled>
          <Label className="text-green-600 line-through">{name}</Label>
          <Badge variant="completed">
            <Check />
          </Badge>
        </Button>
      ) : (
        <Button variant="outline" disabled>
          <Label>{name}</Label>
          <Badge>
            <Play />
          </Badge>
        </Button>
      )}
    </>
  );
}

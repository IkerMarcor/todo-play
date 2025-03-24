import { BellRing, Check, Play } from "lucide-react";

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
  name: string;
  description: string;
  priority: string;
  status: string;
}

export default function TaskInProgress({
  name,
  description,
  priority,
  status,
}: Props) {

  return (
    <>
      {status === "inProgress" ? (
        <Card className="md:w-1/2 m-2">
          <CardHeader>
            <h1 className="text-wrap break-all font-semibold line-clamp-2 text-xl">{name}</h1>
            <div className="flex justify-center">
              <Badge> Priority {priority}</Badge>
            </div>
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
          <CardFooter className="justify-evenly">
            <Button className="w-full" size={"lg"}>
              <Check /> Mark as completed
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

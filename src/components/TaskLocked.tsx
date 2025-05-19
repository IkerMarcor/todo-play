import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TaskOnPauseProps {
  index: number;
  name: string;
  priority: string;
  description: string;
}

export default function TaskOnPause(props: TaskOnPauseProps) {
  return (
    <Card tabIndex={-1} className="opacity-40 text-pretty break-words cursor-default">
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
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <Button className="w-full" type="button" disabled>
          <Play /> Resume
        </Button>
      </CardFooter>
    </Card>
  );
}

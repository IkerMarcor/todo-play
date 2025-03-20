import { useState, useEffect } from "react";

import { BellRing, Check, Play, Pause} from "lucide-react";

import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card";
interface Props {
  name: string;
  description: string;
  priority: string;
  status: string;
}

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]

export default function TaskInProgress({
  name,
  description,
  priority,
  status,
}: Props) {
  const [progress, setProgress] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {status === "inProgress" ? (
        <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
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
          <div>
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Check /> Mark all as read
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

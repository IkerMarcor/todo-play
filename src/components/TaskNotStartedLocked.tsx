import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";

export default function TaskNotStarted({ name }: { name: string }) {
  return (
    <Button variant="disabled" disabled>
      <Label>{name}</Label>
      <Badge>
        <Play />
      </Badge>
    </Button>
  );
}

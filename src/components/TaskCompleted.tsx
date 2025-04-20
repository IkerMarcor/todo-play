import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";

export default function TaskCompleted() {
  const selectedTask = useSelectedTaskStore((state) => state.getSelectedTask())
  return (
    <Button variant="disabled" disabled>
      <Label className="text-green-600 line-through">{selectedTask?.name}</Label>
      <Badge className="bg-green-600">
        <Check />
      </Badge>
    </Button>
  );
}

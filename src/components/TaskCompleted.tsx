import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function TaskCompleted({ name }: { name: string }) {
  return (
    <Button variant="disabled" disabled>
      <Label className="text-green-600 line-through">{name}</Label>
      <Badge className="bg-green-600">
        <Check />
      </Badge>
    </Button>
  );
}

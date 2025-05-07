import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DeleteAllTaskButton({ disabled }: { disabled: boolean }) {
  return (
    <Button
      disabled={disabled}
      className="basis-1/3"
      onClick={() => {
        console.log("playstarted");
      }}
    >
      <Play />
      Play
    </Button>
  );
}

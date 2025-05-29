import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayStore } from "@/store/usePlayStore";

export default function DeleteAllTaskButton({ disabled }: { disabled: boolean }) {
  const startPlay = usePlayStore(e => e.startPlay)
  return (
    <Button
      disabled={disabled}
      className="basis-1/3"
      onClick={() => startPlay()}
    >
      <Play />
      Play
    </Button>
  );
}

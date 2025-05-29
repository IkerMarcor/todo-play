import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayStore } from "@/store/usePlayStore";

export default function DeleteAllTaskButton({ disabled }: { disabled: boolean }) {
  const initPlay = usePlayStore(e => e.initPlay)
  return (
    <Button
      disabled={disabled}
      className="basis-1/3"
      onClick={() => initPlay()}
    >
      <Play />
      Play
    </Button>
  );
}

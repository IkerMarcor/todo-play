import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useTaskStore from "@/store/useTaskStore";

const { addBreak } = useTaskStore.getState();

export default function AddBreak() {
  return (
    <Button variant={"outline"} onClick={() => addBreak()}>
      <Plus /> Add Break
    </Button>
  );
}

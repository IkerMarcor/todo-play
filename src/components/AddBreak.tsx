import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useBreakStore from "@/store/useBreakStore";

const { createBreak } = useBreakStore.getState();

export default function AddBreak() {
  return (
    <Button variant={"outline"} onClick={() => createBreak()}>
      <Plus /> Add Break
    </Button>
  );
}

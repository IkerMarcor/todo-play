import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useBreakStore from "@/store/useBreakStore";

export default function AddBreak() {
  const createBreak = useBreakStore((state) => state.createBreak);
  
  return (
    <Button variant={"outline"} onClick={createBreak}>
      <Plus /> Add Break
    </Button>
  );
}

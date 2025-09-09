import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useBreakStore from "@/store/useBreakStore";

export default function AddBreak() {
  const createBreak = useBreakStore((state) => state.createBreak);
  
  return (
    <Button className="shadow-lg hover:shadow-xl transition-shadow" variant={"outline"} onClick={createBreak}>
      <Plus /> Break
    </Button>
  );
}

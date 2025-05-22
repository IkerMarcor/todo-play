import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useSortStore from "@/store/useSortStore";

export default function FilterDropdownMenu({
  disabled,
}: {
  disabled: boolean;
}) {
  const filterTasks = useSortStore((s) => s.filterTasks);
  const clearFilters = useSortStore((s) => s.clearFilters);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={disabled}>
          <ListFilter />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => clearFilters()}>All</DropdownMenuItem>
        <DropdownMenuItem onClick={() => filterTasks("completed")}>
          Completed
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => filterTasks("pending")}>
          Pending
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

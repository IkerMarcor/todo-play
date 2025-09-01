import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import useTaskStore from "@/store/useTaskStore";
import { useState } from "react";

export default function FilterDropdownMenu({
  disabled,
}: {
  disabled: boolean;
}) {
  const filterTasks = useTaskStore((s) => s.filterTasks);
  const clearFilters = useTaskStore((s) => s.clearFilters);
  const [position, setPosition] = useState("all");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={disabled}>
          <ListFilter />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={(value) => {
            setPosition(value);
            filterTasks(value);
          }}
        >
          <DropdownMenuLabel>State</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Completed">
            Completed
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Pending">Pending</DropdownMenuRadioItem>
          <DropdownMenuLabel>Priority</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioItem value="A">A</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="B">B</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="C">C</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            clearFilters();
            setPosition("all");
          }}
        >
          Clear Filters
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

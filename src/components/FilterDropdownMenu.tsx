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

export default function FilterDropdownMenu({ disabled }: { disabled: boolean }) {
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
        <DropdownMenuItem>All</DropdownMenuItem>
        <DropdownMenuItem>Completed</DropdownMenuItem>
        <DropdownMenuItem>Pending</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

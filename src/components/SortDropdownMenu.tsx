import { ListFilter, ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useTaskStore from "@/store/useTaskStore";

export default function SortDropdownMenu({ disabled }: { disabled: boolean }) {
  const sortTasks = useTaskStore((s) => s.sortTasks);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={disabled}
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <ArrowDownUp />
          Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            sortTasks("name");
          }}
        >
          <ListFilter className="mr-2" /> Name
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            sortTasks("date");
          }}
        >
          <ListFilter className="mr-2" /> Date created
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            sortTasks("priority");
          }}
        >
          <ListFilter className="mr-2" /> Priority
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            sortTasks("duration");
          }}
        >
          <ListFilter className="mr-2" /> Duration
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

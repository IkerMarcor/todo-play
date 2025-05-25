import { ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useTaskStore from "@/store/useTaskStore";
import { useState } from "react";

export default function SortDropdownMenu({ disabled }: { disabled: boolean }) {
  const sortTasks = useTaskStore((s) => s.sortTasks);
  const [sortBy, setSortBy] = useState("createdAt");
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
        <DropdownMenuRadioGroup value={sortBy} onValueChange={(value) => {
          setSortBy(value);
          sortTasks(value);
        }}>
          <DropdownMenuRadioItem value="name" >
            Name
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="createdAt" >
            Date Created
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="priority">
            Priority
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="time" >
            Duration
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { ArrowDownNarrowWide, ArrowUpNarrowWide, ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useToggleSortStore from "@/store/useToggleSortStore";

export default function SortDropdownMenu({ disabled }: { disabled: boolean }) {
const nameSort = useToggleSortStore((s) => s.name);
const dateSort = useToggleSortStore((s) => s.date);
const toggleSort = useToggleSortStore((s) => s.toggle);

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
        <DropdownMenuItem onClick={() => toggleSort("name")}>
          {nameSort === "ASC" ? <ArrowDownNarrowWide className="mr-2" /> : <ArrowUpNarrowWide className="mr-2" />}
          {nameSort} | Name
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleSort("date")}>
          {dateSort === "ASC" ? <ArrowDownNarrowWide className="mr-2" /> : <ArrowUpNarrowWide className="mr-2" />}
          {dateSort} | Date
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

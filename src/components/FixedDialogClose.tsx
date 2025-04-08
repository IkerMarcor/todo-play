import { XIcon } from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";
import useToggleStore from "@/store/useToggleStore";
import { ToggleKey } from "@/types/toggleTypes";

export default function FixedDialogClose({
  toggleKey,
}: {
  toggleKey: ToggleKey;
}) {
  const { setOpen } = useToggleStore();
  return (
    <DialogClose asChild>
      <button
        type="button"
        className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        onClick={() => setOpen(toggleKey, false)}
        onKeyUp={(event) => {
          if (event.key === "Escape") {
            setOpen(toggleKey, false);
          }
        }}
      >
        <XIcon />
        <span className="sr-only">Close</span>
      </button>
    </DialogClose>
  );
}

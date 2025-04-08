import useToggleStore from "@/store/useToggleStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FixedDialogClose from "@/components/FixedDialogClose";

export default function TaskTiltle({ title }: { title: string }) {
  const { setOpen, updateTitleToggle } = useToggleStore();
  return (
    <Dialog open={updateTitleToggle}>
      <button
        className="cursor-pointer"
        onClick={() => setOpen("updateTitleToggle", true)}
      >
        <h1 className="font-semibold line-clamp-2 text-xl">{title}</h1>
      </button>
      <DialogContent className="sm:max-w-[425px]">
        <FixedDialogClose toggleKey="updateTitleToggle" />
        <DialogHeader>
          <DialogTitle>Edit Task Title</DialogTitle>
          <DialogDescription>
            Modify the name of your task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" value="Task Title" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

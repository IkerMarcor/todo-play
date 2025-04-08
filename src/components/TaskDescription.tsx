import useToggleStore from "@/store/useToggleStore";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import FixedDialogClose from "@/components/FixedDialogClose";

export default function TaskDescription({
  description,
}: {
  description: string;
}) {
  const { setOpen, updateDescriptionToggle } = useToggleStore();
  return (
    <Dialog open={updateDescriptionToggle}>
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => {
          setOpen("updateDescriptionToggle", true);
          console.log("hi");
        }}
      >
        <p className="text-gray-500 line-clamp-8">{description}</p>
      </button>
      <DialogContent className="sm:max-w-[425px]">
        <FixedDialogClose toggleKey="updateDescriptionToggle" />
        <DialogHeader>
          <DialogTitle>Edit Task Description</DialogTitle>
          <DialogDescription>
            Modify your task description here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input id="description" value="Task Description" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

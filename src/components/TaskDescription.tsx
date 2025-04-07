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
        <DialogHeader>
          <DialogTitle>Edit Task Description</DialogTitle>
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
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen("updateDescriptionToggle", false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

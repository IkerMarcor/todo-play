import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddTaskButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Add Task</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <CardHeader>
          <CardTitle>Create a new task</CardTitle>
          <CardDescription>Add your new task in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Task Name</Label>
                <Input id="name" placeholder="Name of your task" />
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="prority">Prority</Label>
                  <Select>
                    <SelectTrigger id="prority">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="a">A</SelectItem>
                      <SelectItem value="b">B</SelectItem>
                      <SelectItem value="c">C</SelectItem>
                      <SelectItem value="d">D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="time">Time</Label>
                  <Select>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="1">1hr</SelectItem>
                      <SelectItem value="2">2hr</SelectItem>
                      <SelectItem value="3">3hr</SelectItem>
                      <SelectItem value="4">4hr</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div></div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Write a brief description about your new task"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button>Add</Button>
        </CardFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

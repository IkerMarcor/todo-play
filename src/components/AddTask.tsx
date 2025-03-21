import useTaskStore from "@/store";
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
import { priorities } from "@/constants/priorities";
import { timeOptions } from "@/constants/timeOptions";
import { useState } from "react";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";

export default function AddTaskButton() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);
  const { createTask } = useTaskStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", { name, priority, time, description });
    createTask(name, description, priority, time, "inProgress");
    setOpen(false);
    // Here you can send the data to an API or perform any other action
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-2/5" onClick={() => setOpen(true)}>Add Task</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Create a new task</CardTitle>
            <CardDescription>Add your new task in one-click.</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Task Name</Label>
                <Input
                  id="name"
                  placeholder="Name of your task"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={true}
                />
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="prority">Prority</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger id="prority">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {priorities.map((prority, index) => (
                        <SelectItem key={index} value={prority}>
                          {prority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="time">Time</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {timeOptions.map((hour, index) => (
                        <SelectItem key={index} value={hour.toString()}>
                          {hour} hr
                        </SelectItem>
                      ))}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction>
              <Button type="submit">Add</Button>
            </AlertDialogAction>
          </CardFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

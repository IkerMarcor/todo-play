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

export default function AddTaskButton() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [time, setTime] = useState("");
  const { createTask } = useTaskStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", { name, priority, time, description });
    createTask(name, description, priority, time, "notStarted");
    // Here you can send the data to an API or perform any other action
  };

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
                <Input
                  id="name"
                  placeholder="Name of your task"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit" onClick={handleSubmit}>
            Add
          </Button>
        </CardFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

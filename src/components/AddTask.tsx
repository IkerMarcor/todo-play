import { useStore } from "@/store";
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
import { time } from "@/constants/time"

export default function AddTaskButton() {
  const { tasks, increasePopulation, removeAllTasks, updateTasks } = useStore();
  return (
    <AlertDialog>
      
      <div>
        <h1>Task Manager</h1>
        <p>Current tasks: {tasks}</p>
        <button onClick={increasePopulation}>Add Task</button>
        <button onClick={removeAllTasks}>Remove All Tasks</button>
        <button onClick={() => updateTasks(10)}>Set Tasks to 10</button>
      </div>

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
                      {priorities.map((prority, index) => (
                        <SelectItem key={index} value={prority}>{prority}</SelectItem>
                      ))}
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
                      {time.map((hour, index) => (
                        <SelectItem key={index} value={hour.toString()}>{hour} hr</SelectItem>
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

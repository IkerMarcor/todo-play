import { toast } from "sonner";
import useTaskStore from "@/store/useTaskStore";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, formSchema } from "@/components/zod/schema";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useToggleStore from "@/store/useToggleStore";
import { priorities, timeOptions } from "@/constants";
import FixedDialogClose from "@/components/FixedDialogClose";
import { useEffect } from "react";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";

export default function UpdateTask({ id }: { id: number }) {
  const{setSelectedTaskId} = useSelectedTaskStore();

  const { tasks } = useTaskStore();
  const task = tasks.find((t) => t.id === id);

  const form = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: task?.name,
      description: task?.description,
      priority: task?.priority, // We use `undefined` instead of empty string because zod validates it.
      time: task?.time,
    },
  });

  const { control, reset, handleSubmit } = form;
  const { createTask } = useTaskStore();
  const { setOpen, updateTaskToggle } = useToggleStore();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createTask(
      values.name,
      values.description,
      values.priority,
      values.time,
      "inProgress"
    );
    setOpen("updateTaskToggle", false);
    reset();
    toast("Your task has been successfully created!", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
    });
  };

  return (
    <Dialog open={updateTaskToggle}>
      <DialogContent>
        <FixedDialogClose toggleKey="updateTaskToggle" />
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <CardHeader>
              <CardTitle>Create a new task</CardTitle>
              <CardDescription>Add your new task in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Task Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || ""}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent position="popper">
                              {priorities.map((priority, index) => (
                                <SelectItem key={index} value={priority}>
                                  {priority}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || ""}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent position="popper">
                              {timeOptions.map((hour, index) => (
                                <SelectItem key={index} value={hour.toString()}>
                                  {hour}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Explain a bit further what the task is about"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between my-4">
              <Button type="submit">Create Task</Button>
              <Button
                type="button"
                variant={"outline"}
                onClick={() => {
                  reset({
                    name: "",
                    description: "",
                    priority: undefined,
                    time: undefined,
                  });
                  setOpen("updateTaskToggle", false);
                  setSelectedTaskId(null);
                }}
              >
                Cancel
              </Button>
            </CardFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

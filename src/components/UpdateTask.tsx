import { toast } from "sonner";
import useTaskStore from "@/store/useTaskStore";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, formSchema } from "@/components/zod/schema";
import { Form } from "@/components/ui/form";

import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useToggleStore from "@/store/useToggleStore";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";
import TitleField from "@/components/TitleField";
import PrioritySelect from "@/components/PrioritySelect";
import TimeSelect from "@/components/TimeSelect";
import DescriptionField from "@/components/DescriptionField";
import { Priority, TimeValues } from "@/constants";
import { convertTimeInHours, convertTimeInSeconds } from "@/middleware";
import { useEffect } from "react";
import { useTimerStore } from "@/store/useTimerStore";

export default function UpdateTask() {
  const selectedTask = useSelectedTaskStore((s) => s.getSelectedTask());
  if (!selectedTask) return;

  const form = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(formSchema),
  });

  const { control, reset, handleSubmit } = form;
  const { updateTask } = useTaskStore();
  const { updateTimer, resume, startReset } = useTimerStore();
  const { setOpen, updateTaskToggle } = useToggleStore();

  useEffect(() => {
    if (updateTaskToggle && selectedTask) {
      reset({
        name: selectedTask.name,
        description: selectedTask.description,
        priority: selectedTask.priority as Priority,
        time: convertTimeInHours(selectedTask.time) as TimeValues,
      });
    }
  }, [updateTaskToggle, selectedTask, reset]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!selectedTask || !selectedTask.id) return;
    if (
      selectedTask.name !== values.name ||
      selectedTask.description !== values.description ||
      selectedTask.priority !== values.priority ||
      convertTimeInHours(selectedTask.time) !== values.time
    ) {
      updateTask(selectedTask.id, {
        name: values.name,
        description: values.description,
        priority: values.priority,
      });
      if (convertTimeInHours(selectedTask.time) !== values.time) {
        const time = convertTimeInSeconds(values.time);

        updateTask(selectedTask.id, {
          time,
        });

        updateTimer(selectedTask.id, {
          time: time,
          remainTime: time,
        });
        startReset(selectedTask.id);
      } else {
        resume(selectedTask.id);
      }

      toast.info("Your task has been updated");
    } else {
      resume(selectedTask.id);
      toast.warning("Nothing has been updated");
    }
    setOpen("updateTaskToggle", false);
  };

  return (
    <Dialog open={updateTaskToggle}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <CardHeader>
              <CardTitle>Edit task</CardTitle>
              <CardDescription>Update your task in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <TitleField control={control} />
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col space-y-1.5">
                    <PrioritySelect control={control} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <TimeSelect control={control} />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <DescriptionField control={control} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between my-4">
              <Button type="submit">Update Task</Button>
              <Button
                type="button"
                variant={"outline"}
                onClick={() => {
                  setOpen("updateTaskToggle", false);
                  resume(selectedTask.id);
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

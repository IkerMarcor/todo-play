import { toast } from "sonner";
import useTaskStore from "@/store/useCRUDTaskStore";
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

import useToggleStore from "@/store/useToggleStore";
import TitleField from "@/components/TitleField";
import DescriptionField from "@/components/DescriptionField";
import PrioritySelect from "@/components/PrioritySelect";
import TimeSelect from "@/components/TimeSelect";
import { getTodayDate } from "@/constants";

export default function AddTask() {
  const form = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      priority: "asdf", // We use `undefined` instead of empty string because zod validates it.
      time: "",
    },
  });

  const { control, reset, handleSubmit } = form;
  const { createTask } = useTaskStore();
  const { setOpen } = useToggleStore();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createTask(
      values.name,
      values.description,
      values.priority,
      values.time,
      "inProgress"
    );
    setOpen("createTaskToggle", false);
    reset();
    toast("Your task has been successfully created!", {
      description: getTodayDate(),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <CardHeader>
          <CardTitle>Create a new task</CardTitle>
          <CardDescription>Add your new task in one-click.</CardDescription>
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
          <Button type="submit">Create Task</Button>
          <Button
            type="button"
            variant={"outline"}
            onClick={() => {
              reset({
                name: "",
                description: "",
                priority: "",
                time: "",
              });
              setOpen("createTaskToggle", false);
            }}
          >
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}

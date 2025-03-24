import { z } from "zod";
import useTaskStore from "@/store";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name of the task must be at least 2 characters.",
    })
    .max(90, "Name of the task must not be longer than 90 characters."),
  priority: z.string({
    required_error: "Please select a priority to display.",
  }),
  time: z.string({
    required_error: "Please choose a time to complete the task.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(290, "Description must not be longer than 290 characters."),
});

export type Schema = z.infer<typeof formSchema>

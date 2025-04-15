import { priorities, timeOptions } from "@/constants";
import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name of the task must be at least 2 characters.",
    })
    .max(90, "Name of the task must not be longer than 90 characters."),
  priority: z
    .enum(priorities, {message: "You must select an option."}),
  time: z
    .enum(timeOptions, {message: "You must select an option."}),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

export type Schema = z.infer<typeof formSchema>;

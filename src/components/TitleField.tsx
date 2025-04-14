import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function TitleField({ control }: { control: any }) {

  return (
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
  );
}

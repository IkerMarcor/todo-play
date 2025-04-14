import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { timeOptions } from "@/constants";

export default function TimeSelect({ control }: { control: any }) {
  return (
    <FormField
      control={control}
      name="time"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Time</FormLabel>
          <Select onValueChange={field.onChange} value={field.value || ""}>
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
  );
}

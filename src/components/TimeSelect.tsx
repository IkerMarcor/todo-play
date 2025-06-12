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
              {timeOptions.map((time, index) => {
                let hour = Number(time); // Convert to number for consistent formatting
                return hour % 1 !== 0 && hour < 1 ? (
                  <SelectItem key={index} value={time}>
                    {hour * 60} mins
                  </SelectItem>
                ) : hour % 1 !== 0 && hour >= 1 ? (
                  <SelectItem key={index} value={time}>
                    {hour - 0.5}:{Math.round((hour % 1) * 60)} mins
                  </SelectItem>
                ) : (
                  <SelectItem key={index} value={time}>
                    {time} hrs
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

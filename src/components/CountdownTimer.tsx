import { Progress } from "@/components/ui/progress";
import { formatTime } from "@/middleware";
import { useTimerStore } from "@/store/useTimerStore";

export default function CountdownTimer() {
  const { initTime, remainTime } = useTimerStore();

  return (
    <div className=" flex items-center space-x-4 rounded-md border p-4">
      <h1>{remainTime > 0 ? formatTime(remainTime) : "Time's up!"}</h1>
      <Progress value={(remainTime * 100) / initTime} />
    </div>
  );
}

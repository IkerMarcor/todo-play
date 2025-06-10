import { Progress } from "@/components/ui/progress";
import { formatTime } from "@/middleware";
import { useTimerStore } from "@/store/useTimerStore";

export default function CountdownTimer({ id }: { id: number }) {
  const timer = useTimerStore((s) => s.timers[id]);

  if (!timer) return null; //loading/error

  return (
    <div className=" flex items-center space-x-4 rounded-md border p-4">
      <h1>{timer.remainTime > 0 ? formatTime(timer.remainTime) : "Time's up!"}</h1>
      <Progress value={(timer.remainTime * 100) / timer.time} />
    </div>
  );
}

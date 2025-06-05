import { Progress } from "@/components/ui/progress";
import { formatTime } from "@/middleware";
import { useTimerStore } from "@/store/useTimerStore";
import { useEffect } from "react";

export default function CountdownTimer() {
  const remainTime = useTimerStore((s) => s.remainTime);
  const initTime = useTimerStore((s) => s.initTime);
  const syncTime = useTimerStore((s) => s.syncTime);

  useEffect(() => {
    const interval = setInterval(() => {
      syncTime();
    }, 1000);
    return () => clearInterval(interval);
  }, [syncTime]);

  return (
    <div className=" flex items-center space-x-4 rounded-md border p-4">
      <h1>{remainTime > 0 ? formatTime(remainTime) : "Time's up!"}</h1>
      <Progress value={(remainTime * 100) / initTime} />
    </div>
  );
}

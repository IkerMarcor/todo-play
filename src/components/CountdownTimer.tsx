import { Progress } from "@/components/ui/progress";
import { useEffect } from "react";
import { formatTime } from "@/middleware";
import { useTimerStore } from "@/store/useTimerStore";
import useSelectedTaskStore from "@/store/useSelectedTaskStore";

export default function CountdownTimer() {
  const { remainTime, isRunning } = useTimerStore();
  const selectedTask = useSelectedTaskStore((state) => state.getSelectedTask());
  const initialSeconds = Number(selectedTask?.initTime);

  useEffect(() => {
    if (!isRunning) return;
    let newSeconds: number;

    const interval = setInterval(() => {
      useTimerStore.setState((state) => {
        newSeconds = parseFloat((state.remainTime - 0.1).toFixed(1));
        if (newSeconds > 0) {
          return { remainTime: newSeconds };
        } else {
          return { remainTime: 0, isRunning: false };
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className=" flex items-center space-x-4 rounded-md border p-4">
      <h1>{remainTime > 0 ? formatTime(remainTime) : "Time's up!"}</h1>
      <Progress value={(remainTime * 100) / initialSeconds} />
    </div>
  );
}

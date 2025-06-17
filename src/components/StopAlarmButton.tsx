import { Button } from "./ui/button";
import { BellOff } from "lucide-react";
import { useTimerStore } from "@/store/useTimerStore";
export default function StopAlarmButton() {
  const stopAlarm = useTimerStore((s) => s.stopAlarm);

  return (
    <Button className="w-full relative overflow-hidden" onClick={stopAlarm}>
      {/* Ping layer (visual only) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center animate-ping pointer-events-none">
        <div className="flex items-center gap-2 text-inherit">
          <BellOff />
          Stop Alarm
        </div>
      </div>

      {/* Actual button content */}
      <div className="relative z-20 flex items-center gap-2">
        <BellOff />
        Stop Alarm
      </div>
    </Button>
  );
}

import { useTimerStore } from "@/store/useTimerStore";
import { useEffect, useRef } from "react";

export default function useAlarm() {
  const isRinging = useTimerStore((s) => s.isRinging);
  const alarmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isRinging && !alarmRef.current) {
      const alarm = new Audio("/alarm.mp3");
      alarm.loop = true;
      alarmRef.current = alarm;

      alarm.play().catch((e) => console.error("Audio playback failed", e));
    } else if (!isRinging && alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
      alarmRef.current.loop = false;
      alarmRef.current = null;
    }
  }, [isRinging]);
}

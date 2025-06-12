import { useTimerStore } from "@/store/useTimerStore";
import { useEffect } from "react";

export default function useAlarm() {
  const isCompleted = useTimerStore((s) => s.isCompleted);
  useEffect(() => {
    if (isCompleted) {
      const alarmSound = new Audio("/alarm.mp3");
      alarmSound
          .play()
          .catch((e) => console.error("Audio playback failed", e));
      
      useTimerStore.setState({ isCompleted: false });
      return;
    }
  }, [isCompleted]);
}

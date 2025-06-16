import { useTimerStore } from "@/store/useTimerStore";
import { useEffect, useState, useRef } from "react";

export default function useAlarm() {
  const isCompleted = useTimerStore((s) => s.isCompleted);
  const [isRinging, setIsRinging] = useState(false);
  const alarmRef = useRef<HTMLAudioElement | null>(null);
  const hasAlarmPlayed = useRef(false);

  useEffect(() => {
    if (!isCompleted || hasAlarmPlayed.current) return;

    hasAlarmPlayed.current = true; // immediately lock it

    const alarm = new Audio("/alarm.mp3");
    alarm.loop = true;
    alarmRef.current = alarm;

    alarm.play().catch((e) => console.error("Audio playback failed", e));
    setIsRinging(true);

    // Small delay before clearing isCompleted to ensure effect doesn't double-trigger
    setTimeout(() => {
      useTimerStore.setState({ isCompleted: false });
    }, 100);
  }, [isCompleted]);

  const stopAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
      alarmRef.current.loop = false;
      alarmRef.current = null;
    }

    setIsRinging(false);
    hasAlarmPlayed.current = false;
    useTimerStore.setState({ isCompleted: false });
  };

  useEffect(() => {
    return () => stopAlarm();
  }, []);

  return {
    isRinging,
    stopAlarm,
  };
}


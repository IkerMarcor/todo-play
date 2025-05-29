import { daysOfWeek, monthsOfYear } from "./constants";
import useTaskStore from "./store/useTaskStore";
import { Task } from "@/types/Task";

export const getTaskById = (id: number): Task | undefined => {
  const { tasks } = useTaskStore.getState();
  return tasks[id] ?? null;
};

export const convertTimeInSeconds = (number: string): number => {
  return Number(number) * 36;
};

export const convertTimeInHours = (number: number): string => {
  return String(Number(number) / 36);
};

const padTime = (n: number) => String(n).padStart(2,"0");

export const getTodayDate = () => {
  const d = new Date();
  return `${daysOfWeek[d.getDay()]}, ${
    monthsOfYear[d.getMonth()]
  } ${d.getDate()}, ${d.getFullYear()} at ${padTime(d.getHours())}:${padTime(
    d.getMinutes()
  )}` as string;
};

export const getTodayTime = () => {
  const d = new Date();
  return `${padTime(d.getHours())}:${padTime(d.getMinutes())}` as string;
}

export const formatTime = (totalSeconds: number) => {
  const seconds = Math.floor(totalSeconds % 60);
  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0)
    return `${String(hours).padStart(2, "0")}:${String(minutes % 60).padStart(
      2,
      "0"
    )}` as string;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}` as string;
};

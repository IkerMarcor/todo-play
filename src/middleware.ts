import { daysOfWeek, monthsOfYear } from "./constants";
import useCRUDTaskStore from "./store/useTaskStore";
import {Task} from "@/types/taskTypes"

export const getTaskById = (id:number): Task | undefined => {
    return useCRUDTaskStore((state) => state.tasks.find((task) => task.id === id));
}

export const convertTimeInSeconds = (number: string): string => {
  return String(Number(number) * 3600);
}

export const convertTimeInHours = (number: string): string => {
  return String(Number(number) / 3600);
}

export const getTodayDate = () => {
  const padTime = (n: number) => String(n).padStart(2, "0");
  const d = new Date();
  return `${daysOfWeek[d.getDay()]}, ${
    monthsOfYear[d.getMonth()]
  } ${d.getDate()}, ${d.getFullYear()} at ${padTime(d.getHours())}:${padTime(
    d.getMinutes()
  )}` as string;
};

export const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}` as string;
};
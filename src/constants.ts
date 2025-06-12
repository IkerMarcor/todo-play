export const priorities = ["A", "B", "C", "D", "N"] as const;
export type Priority = (typeof priorities)[number];

export const prioritiesLabel = [
  { label: "High (A)", value: "A" },
  { label: "Medium (B)", value: "B" },
  { label: "Low (C)", value: "C" },
  { label: "Very Low (D)", value: "D" },
  { label: "No Priority", value: "N" },
] as const;
export type PriorityLabel = (typeof prioritiesLabel)[number]["value"];

export const timeOptions = ["0.25","0.5", "1", "1.5", "2", "2.5", "3"] as const;
export type TimeValues = (typeof timeOptions)[number];

export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;
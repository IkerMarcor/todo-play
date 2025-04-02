export const priorities = ["A", "B", "C", "D"] as const;
export type Priority = (typeof priorities)[number];

export const timeOptions = [1, 2, 3, 4, 5, 6, 7] as const;
export type TimeValues = (typeof timeOptions)[number];

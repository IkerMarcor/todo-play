export const priorities = ["A", "B", "C", "D"] as const;
export type Priority = (typeof priorities)[number];

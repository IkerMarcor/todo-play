export type TaskKeys =
  | "id"
  | "name"
  | "description"
  | "priority"
  | "time"
  | "remainTime"
  | "status"
  | "createdAt";

export interface Task {
  id: number;
  name: string;
  description: string;
  priority: string;
  time: string;
  remainTime: string;
  status: string;
  createdAt: number;
}

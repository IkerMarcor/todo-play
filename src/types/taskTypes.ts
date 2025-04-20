export type TaskKeys =
  | "id"
  | "name"
  | "description"
  | "priority"
  | "initTime"
  | "remainTime"
  | "status";

export interface Task {
  id: number;
  name: string;
  description: string;
  priority: string;
  initTime: string;
  remainTime: string;
  status: string;
}

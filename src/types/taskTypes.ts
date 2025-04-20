export type TaskKeys =
 | "id"
 | "name"
 | "description"
 | "priority"
 | "initTime"
 | "status";

export interface Task {
    id: number;
    name: string;
    description: string;
    priority: string;
    initTime: string;
    status: string;
}
export type ToggleKey =
  | "createTaskToggle"
  | "deleteAllTaskToggle"
  | "updateTaskToggle";

export interface Toggle {
  createTaskToggle: boolean;
  deleteAllTaskToggle: boolean;
  updateTaskToggle: boolean;
}

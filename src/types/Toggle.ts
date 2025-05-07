export type ToggleKey =
  | "createTaskToggle"
  | "deleteAllTaskToggle"
  | "updateTaskToggle"
  | "disableToggle";

export interface Toggle {
  createTaskToggle: boolean;
  deleteAllTaskToggle: boolean;
  updateTaskToggle: boolean;
  disableToggle:boolean;
}

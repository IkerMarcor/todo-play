export type ToggleKey =
  | "createTaskToggle"
  | "deleteAllTaskToggle"
  | "updateTaskToggle"
  | "disableToggle"
  | "playModeToggle";

export interface Toggle {
  createTaskToggle: boolean;
  deleteAllTaskToggle: boolean;
  updateTaskToggle: boolean;
  disableToggle:boolean;
  playModeToggle: boolean;
}

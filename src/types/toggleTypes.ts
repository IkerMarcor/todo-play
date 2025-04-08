export type ToggleKey =
  | "addTaskToggle"
  | "deleteTaskToggle"
  | "updateTitleToggle"
  | "updateDescriptionToggle"
  | "updatePriorityToggle";

export interface ToggleBooleans {
  addTaskToggle: boolean;
  deleteTaskToggle: boolean;
  updateTitleToggle: boolean;
  updateDescriptionToggle: boolean;
  updatePriorityToggle: boolean;
}

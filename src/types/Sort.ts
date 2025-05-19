export type ToggleKey =
  | "name"
  | "date";

export interface Toggle {
  name: "ASC" | "DESC";
  date: "ASC" | "DESC";
}
export type InputType =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

export function hasMinMax(type: InputType) {
  switch (type) {
    case "number":
    case "range":
    case "date":
    case "datetime-local":
    case "month":
    case "time":
    case "week":
      return true;

    default:
      return false;
  }
}

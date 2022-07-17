export interface Toast {
  id: number;
  text: string;
  level: ToastLevel;
  duration: number;
}

export interface ToastOptions {
  level?: ToastLevel;
  duration?: number;
}

export type ToastLevel = "info" | "warning" | "error";

export function getBackgroundColor(level: ToastLevel): string {
  switch (level) {
    case "info":
      return "lightblue";

    case "warning":
      return "darkorange";

    case "error":
      return "salmon";

    default:
      return "white";
  }
}

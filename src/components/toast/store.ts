import { writable, Writable } from "svelte/store";
import type { Toast, ToastOptions } from "./toast";


function createStore(): ToastStore {
  const { subscribe, update } = writable<Toast[]>([]);
  let id = 0;

  function push(text: string, options?: ToastOptions) {
    const newToast: Toast = {
      id: ++id,
      text,
      level: options?.level ?? defaultToastOptions.level,
      duration: options?.duration ?? defaultToastOptions.duration,
    };

    update(toasts => [...toasts, newToast]);
  }

  function remove(id: number) {
    update(toasts => toasts.filter(x => x.id !== id));
  }

  return {
    subscribe,
    push,
    remove,
  };
}

export const toasts = createStore();


interface ToastStore {
  subscribe: Writable<Toast[]>["subscribe"];
  push: (text: string, options?: ToastOptions) => void;
  remove: (id: number) => void;
}


export const defaultToastOptions: ToastOptions = {
  level: "info",
  duration: 3000,
};

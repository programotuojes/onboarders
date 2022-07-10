export function outClick(node: HTMLElement, callback: () => void): SvelteActionReturnType {
  function handle(event: MouseEvent) {
    !node.contains(event.target as Node) && callback();
  }

  document.addEventListener("click", handle);

  return {
    destroy() {
      document.removeEventListener("click", handle);
    },
  };
}

export function outFocus(node: HTMLElement, callback: () => void): SvelteActionReturnType {
  function handle() {
    !node.contains(document.activeElement) && callback();
  }

  document.addEventListener("focusin", handle);

  return {
    destroy() {
      document.removeEventListener("focusin", handle);
    },
  };
}

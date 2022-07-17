<script lang="ts">
  import { tweened } from "svelte/motion";
  import { fly } from "svelte/transition";
  import { defaultToastOptions, toasts } from "./store.ts";
  import type { ToastLevel } from "./toast.d.ts";
  import { getBackgroundColor } from "./toast.d.ts";


  export let id: number;
  export let text: string;
  export let duration: number = defaultToastOptions.duration;
  export let level: ToastLevel = defaultToastOptions.level;
  export let style: string = "";

  const progress = tweened(1, { duration });
  progress.set(0);
  setTimeout(() => toasts.remove(id), duration);

  const rootStyle = `background-color: ${getBackgroundColor(level)}; ${style}`;
</script>

<div
  class="root"
  style={rootStyle}
  transition:fly={{y: 20, duration: 200}}
>
  <p>{text}</p>

  <svg
    on:click={() => toasts.remove(id)}
    viewBox="0 0 16 16"
  >
    <path
      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
  </svg>

  <progress value={$progress}></progress>
</div>

<style lang="postcss">

  .root {
    align-items: center;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-xl);
    display: flex;
    gap: 1.2rem;
    justify-content: space-between;
    max-width: 20rem;
    min-width: 10rem;
    overflow: hidden;
    padding: 0 1.2rem;
    position: relative;
    z-index: 9000;
  }

  svg {
    border-radius: 50%;
    cursor: pointer;
    flex: none;
    height: 2rem;
    transition: background-color 100ms linear;
    width: 2rem;

    &:hover { background-color: rgb(0 0 0 / 0.15); }
    &:active { background-color: rgb(0 0 0 / 0.3); }
  }

  progress {
    background: none;
    border: none;
    bottom: 0;
    height: 0.25rem;
    left: 0;
    position: absolute;
    width: 100%;

    &::-moz-progress-bar { background-color: rgb(0 0 0 / 0.2); }
    &::-webkit-progress-value { background-color: rgb(0 0 0 / 0.2); }
    &::-webkit-progress-bar { background: none; }
  }

</style>

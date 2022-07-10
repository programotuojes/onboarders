<script lang="ts">
  import { onMount } from "svelte";
  import type { InputType } from "./Input.d.ts";
  import { hasMinMax } from "./Input.d.ts";


  export let value: string | number = "";
  export let label: string = "";
  export let type: InputType = "text";
  export let min: string | undefined = undefined;
  export let max: string | undefined = undefined;
  export let style: string = "";

  export let inputNode: HTMLInputElement | undefined = undefined;

  $: canAdd = type !== "number" || max === undefined || value < parseInt(max);
  $: canSubtract = type !== "number" || min === undefined || value > parseInt(min);

  onMount(() => {
    inputNode.type = type;

    if (min !== undefined && hasMinMax(type))
      inputNode.min = min;

    if (max !== undefined && hasMinMax(type))
      inputNode.max = max;
  });
</script>

<div class="root">
  <input
    autocomplete="off"
    bind:this={inputNode}
    bind:value
    id={label}
    placeholder=" "
    required
    {style}
  >

  <label for={label}>{label}</label>

  {#if type === "number"}
    <div class="arrows">
      <div
        on:click={() => canAdd && value++}
        class:disabled={!canAdd}
      >
        <svg
          width="12"
          height="12"
          fill="currentColor"
          class="bi bi-caret-up-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
        </svg>
      </div>

      <div
        on:click={() => canSubtract && value--}
        class:disabled={!canSubtract}
      >
        <svg
          width="12"
          height="12"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">

  .root {
    margin-top: 1rem;
    position: relative;
  }

  label {
    color: gray;
    cursor: text;
    left: 0.85rem;
    position: absolute;
    top: 0.7rem;
    transition-duration: 175ms;
    transition-property: left, top, font-size;
    transition-timing-function: ease-in-out;
    user-select: none;
  }

  input {
    border: var(--border);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    font-family: inherit;
    font-size: inherit;
    height: 2.5rem;
    outline-style: none;
    padding: 0.25rem 0.75rem;
    transition: border 100ms ease-in;
    width: 10rem;

    &:hover { border-color: gray; }
    &:focus { border-color: cornflowerblue; }

    &:focus ~ label,
    &:not(:placeholder-shown) ~ label {
      font-size: 0.8rem;
      left: 0;
      top: -1.2rem;
    }
  }

  .arrows {
    align-items: center;
    display: flex;
    flex-direction: column;
    font-size: 0.7rem;
    height: 100%;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    user-select: none;
    width: 2rem;

    & div {
      align-items: center;
      background-color: lightgray;
      display: flex;
      flex-grow: 1;
      justify-content: center;
      transition: background-color 100ms ease-in;
      width: 100%;

      &:not(.disabled):hover {
        background-color: darkgray;
        cursor: pointer;
      }

      &.disabled {
        background-color: darkgray;
        color: gray;
      }

      &:not(.disabled):active { background-color: gray; }
    }

    & div:first-child { border-top-right-radius: var(--border-radius); }
    & div:last-child { border-bottom-right-radius: var(--border-radius); }
  }

</style>

<script context="module" lang="ts">
  let count: number = 0;
</script>

<script lang="ts">
  import { fly } from "svelte/transition";
  import { outClick, outFocus } from "./actions.ts";
  import { Key } from "./Key.d.ts";


  export let data: Selection[] = [];
  export let selected: Selection[] = [];
  export let displayProp: string = "";
  export let label: string = "";


  interface Selection {
    id: number,

    [key: string]: any
  }


  let inputValue: string = "";
  let inputNode: HTMLInputElement;
  let dropdownNode: HTMLElement;
  let focused: boolean = false;
  const inputId: string = `multiselect-${count++}`;

  $: filtered = data.filter(x => inputValue
    ? x[displayProp].toLowerCase().includes(inputValue.toLowerCase())
    : x);

  function onRootClick() {
    focused = true;
    inputNode.focus();
  }

  function onRootKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case Key.Enter:
        if (inputValue.length === 0 || filtered.length !== 1) {
          inputValue = "";
          break;
        }

        event.preventDefault();
        select(filtered[0])();
        break;

      case Key.ArrowDown:
        event.preventDefault();

        if (document.activeElement === inputNode)
          (dropdownNode.firstElementChild as HTMLElement).focus();

        break;
    }
  }

  const select = (obj: Selection) => () => {
    inputValue = "";

    if (!selected.includes(obj))
      selected = [...selected, obj];
    else
      selected = selected.filter(x => x !== obj);

    // Rerender filtered array to show selected position
    data = data;
  };

  const onDropdownKeyDown = (obj: Selection) => (event: KeyboardEvent) => {
    switch (event.key) {
      case Key.Enter:
        select(obj)();
        break;

      case Key.ArrowUp:
        event.preventDefault();
        const previousSibling = (event.target as HTMLElement).previousElementSibling as HTMLElement;
        (previousSibling ?? inputNode).focus();
        break;

      case Key.ArrowDown:
        event.preventDefault();
        const nextSibling = (event.target as HTMLElement).nextElementSibling as HTMLElement;
        nextSibling && nextSibling.focus();
        break;

      // Propagate default focus selection without focusing inputNode
      case Key.Tab:
      case Key.Shift:
        break;

      default:
        inputNode.focus();
    }
  };

  function getUnderlined(str: string): string {
    if (inputValue.length === 0)
      return str;

    // Input is already filtered, index should be found
    // TODO string.indexOf() doesn't work on Chrome (Android)
    const index = str.toLowerCase().indexOf(inputValue);

    const before = str.substring(0, index);
    const middle = str.substring(index, inputValue.length + index); // Ignore inputValue case
    const after = str.substring(index + inputValue.length);

    return `${before}<u>${middle}</u>${after}`;
  }

  function getOrdinal(obj: Selection): string {
    const index = selected.indexOf(obj) + 1;

    if (index === 0)
      return "";

    let postfix: string;

    switch (index % 10) {
      case 1:
        postfix = "st";
        break;

      case 2:
        postfix = "nd";
        break;

      case 3:
        postfix = "rd";
        break;

      default:
        postfix = "th";
    }

    if (index === 11 || index === 12 || index === 13)
      postfix = "th";

    return ` (${index}${postfix})`;
  }

  // TODO on:click|stopPropagation doesn't remove focus from li on desktop
</script>

<div
  class="root"
  on:click={onRootClick}
  on:keydown={onRootKeyDown}
  use:outClick={() => focused = false}
  use:outFocus={() => focused = false}
>
  <div class="actions">
    {#if selected.length > 0}
      <div class="selected-values">
        {selected.length} selected
      </div>
    {/if}

    <input
      autocomplete="off"
      bind:this={inputNode}
      bind:value={inputValue}
      id={inputId}
      on:focus={() => focused = true}
      placeholder=" "
    >

    <label
      class:something-selected={focused || selected.length > 0}
      for={inputId}
    >
      {label}
    </label>

    <svg
      class:dropdown-shown={focused}
      fill="none"
      on:click|stopPropagation={() => focused = !focused}
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

  </div>

  {#if focused}
    <ul transition:fly={{y: -10, duration: 175}} bind:this={dropdownNode}>
      {#if filtered.length === 0}
        <li class="not-found">Not found</li>
      {:else}
        {#each filtered as option (option.id)}
          <li
            tabindex="0"
            on:click|stopPropagation={select(option)}
            on:keydown={onDropdownKeyDown(option)}
            class:selected={selected.includes(option)}
          >
            {@html getUnderlined(option[displayProp])}{getOrdinal(option)}
          </li>
        {/each}
      {/if}
    </ul>
  {/if}
</div>

<style lang="postcss">

  .root {
    background-color: white;
    border: var(--border);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    height: 2.5rem;
    margin-top: 1rem;
    padding: 0.25rem 0.75rem;
    position: relative;
    transition: border 100ms ease-in;
    width: 20rem;

    &:hover { border-color: gray; }
    &:focus-within { border-color: cornflowerblue; }
  }

  .actions {
    align-items: center;
    display: flex;
    gap: 0.5rem;
    height: 100%;
    width: 100%;
  }

  .selected-values {
    align-items: center;
    color: gray;
    display: flex;
    max-width: 10rem;
    user-select: none;
    white-space: nowrap;
  }

  label {
    color: gray;
    cursor: text;
    left: 0.75rem;
    position: absolute;
    top: 0.6rem;
    transform-origin: left;
    transition: transform ease-in-out 175ms;
    user-select: none;
  }

  input {
    border: none;
    padding: 0;
    width: 100%;

    &:focus { outline-style: none; }

    & ~ label.something-selected,
    &:not(:placeholder-shown) ~ label {
      cursor: default;
      transform: translateX(-0.85rem) translateY(-2rem) scale(0.8);
    }
  }

  ul {
    background-color: lightgray;
    border: var(--border);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    left: 0;
    list-style: none;
    overflow: hidden;
    padding: 0;
    position: absolute;
    top: 1.7rem;
    width: 100%;
  }

  li {
    background-color: white;
    cursor: default;
    outline-style: none;
    padding: 0.5rem 1rem;
    transition-duration: 100ms;
    transition-property: filter, background-color;
    transition-timing-function: linear;
    user-select: none;

    &:hover { filter: brightness(90%); }
    &:focus, &:active { filter: brightness(80%); }

    &.not-found { filter: none; }
    &.selected { background-color: #d5f3ff; }
  }

  svg {
    height: 1rem;
    min-width: 1rem;
    transition: transform 250ms linear;

    &.dropdown-shown { transform: rotateZ(180deg); }
  }

</style>

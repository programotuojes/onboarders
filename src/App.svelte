<script lang="ts">
  import { toasts } from "./components/toast/store.ts";
  import Toast from "./components/toast/Toast.svelte";
  import Onboarders from "./pages/onboarders/Onboarders.svelte";
  import Tags from "./pages/tags/Tags.svelte";
  import Teams from "./pages/teams/Teams.svelte";


  type Theme = "auto" | "light" | "dark";
  let value: Theme = "auto";
  const html: HTMLElement = document.documentElement;

  function changeTheme() {
    switch (value) {
      case "auto":
        html.classList.remove("is-dark", "is-light");
        break;

      case "light":
        html.classList.add("is-light");
        html.classList.remove("is-dark");
        break;

      case "dark":
        html.classList.add("is-dark");
        html.classList.remove("is-light");
        break;
    }
  }
</script>

<Tags />
<Teams />
<Onboarders />

<div class="toast-container">
  {#each $toasts as toast (toast.id)}
    <Toast {...toast} />
  {/each}
</div>


<button
  on:click={() => toasts.push("Test", {level: "info"})}
  style="position: fixed; right: 0; bottom: 0; margin: 1rem; padding: 0.5rem"
>
  Show info
</button>
<button
  on:click={() => toasts.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur risus eu lacus convallis.", {level: "warning", duration: 9000})}
  style="position: fixed; right: 0; bottom: 3rem; margin: 1rem; padding: 0.5rem"
>
  Show warning
</button>
<button
  on:click={() => toasts.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur risus eu lacus convallis.", {level: "error"})}
  style="position: fixed; right: 0; bottom: 6rem; margin: 1rem; padding: 0.5rem"
>
  Show error
</button>

<label for="theme">Theme:</label>
<select bind:value id="theme" on:change={changeTheme}>
  <option value="auto">Auto</option>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
</select>

<style>

  label {
    bottom: 2rem;
    left: 0;
    margin: 1rem;
    position: fixed;
  }

  select {
    bottom: 0;
    left: 0;
    margin: 1rem;
    position: fixed;
  }

  .toast-container {
    bottom: 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    left: 50vw;
    margin-bottom: 2rem;
    padding: 0;
    position: fixed;
    transform: translateX(-50%);
  }

</style>

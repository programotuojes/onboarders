<script lang="ts">
  import Onboarders from "./pages/onboarders/Onboarders.svelte";
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

<Teams />
<Onboarders />

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

</style>

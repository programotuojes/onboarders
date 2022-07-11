<script lang="ts">
  import Onboarders from "./pages/onboarder/Onboarders.svelte";
  import Teams from "./pages/team/Teams.svelte";


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

<select bind:value on:change={changeTheme}>
  <option value="auto">Auto</option>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
</select>

<style>

  select {
    left: 0;
    position: fixed;
    top: 0;
  }

</style>

<script lang="ts">
  import { assignTeams } from "./calculation.ts";
  import { nameOf } from "./common";
  import type { Column } from "./components/table/table.d.ts";
  import Table from "./components/table/Table.svelte";
  import { toasts } from "./components/toast/store.ts";
  import Toast from "./components/toast/Toast.svelte";
  import type { Onboarder } from "./pages/onboarders/onboarder.d.ts";
  import Onboarders from "./pages/onboarders/Onboarders.svelte";
  import { onboarders } from "./pages/onboarders/store.ts";
  import Tags from "./pages/tags/Tags.svelte";
  import { teams } from "./pages/teams/store.ts";
  import type { Team } from "./pages/teams/team";
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

  const columns: Column[] = [
    { key: nameOf<Onboarder>("name") },
    {
      key: nameOf<Onboarder>("assignedTeam"),
      title: "Assigned team",
      displayFunc: (team: Team) => team.name,
    },
  ];
  let assignedOnboarders: Onboarder[] | undefined;

  function assign() {
    assignedOnboarders = assignTeams($onboarders, $teams);
  }

</script>

<Tags />
<Teams />
<Onboarders />

<hr/>

<h1 style="text-align: center">Results</h1>
<Table {columns} rows={assignedOnboarders} />
<button class="assign" on:click={assign}>Assign</button>

<div class="toast-container">
  {#each $toasts as toast (toast.id)}
    <Toast {...toast} />
  {/each}
</div>


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

  .assign {
    background-color: wheat;
    display: block;
    margin: 2rem auto;
    padding: 1rem 2rem;
    width: 10rem;
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

  hr {
    margin-top: 2rem;
    height: 0.1rem;
    border: none;
    background-color: rgba(0 0 0 / 0.2);
  }

</style>
